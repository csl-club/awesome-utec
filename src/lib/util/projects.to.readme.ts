import type { Project } from "../content";
import { repoStringToUrl } from "$lib/repo";

const mainTag = '$'
enum MainTags {
    projects = 'projects',
    index = 'index'
}

const subTag = '%'
enum SubTags {
    name = 'name',
    authors = 'authors',
    tags = 'tags',
    summary = 'summary',
    repo = 'repo',
    lang = 'lang'
}

interface TemplateState {
    content: string
}
// Markdown utils
export const doURL = (name: string, url: string) => `[${name}](${url})`;

// General utils
export const doSubTag = (name: string) => new RegExp(`${subTag}${name}${subTag}`, 'g');

export const formatProject = (line: string, project: Project) => {
    return line
        .replace(doSubTag(SubTags.name), doURL(project.name, repoStringToUrl(project.repo)))
        .replace(doSubTag(SubTags.authors), project.authors.map(a => a.name).join(', '))
        .replace(doSubTag(SubTags.tags), project.tags.join(', '))
        .replace(doSubTag(SubTags.summary), project.summary)
        .replace(doSubTag(SubTags.repo), project.repo)
        .replace(doSubTag(SubTags.lang), project.lang ?? '')
}

export const formatProjectsByTags = (args: string, projectsByTag: Map<string, Project[]>): string[] => {
    var baseLines: string[] = [];
    for (const [tag, projects] of projectsByTag) {
        baseLines.push(`### ${capitalize(tag)}`);
        for (const project of projects) {
            var formattedProjects = formatProject(args, project);
            baseLines.push(formattedProjects);
        }
    }

    return baseLines;
}


export const writeLine = (state: TemplateState, line: string) => {
    state.content += state.content ? `\n${line}` : line
}

export const writeLines = (state: TemplateState, lines: string[]) => {
    for (const line of lines) {
        writeLine(state, line)
    }
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const processTemplate = async(template: string[], projects: Project[]): Promise<string> => {
    var state: TemplateState = { content: "" };


    for await (const line of template) {
        var begin = line.indexOf(mainTag)
        var end = line.indexOf(mainTag, begin + 1)

        // Do not format
        if (begin == -1 || end == -1) {
            writeLine(state, line)
            continue
        }

        var lineTag = line.substring(begin + 1, end)
            .toLowerCase()
            .split("::");
        console.log(lineTag)
        
        switch (lineTag[0]) {
            case MainTags.projects:
                var projectsByTag: Map<string, Project[]> = new Map()
                for (const project of projects) {
                    for (const tag of project.tags) {
                        if (!projectsByTag.has(tag)) {
                            projectsByTag.set(tag, [])
                        }
                        projectsByTag.get(tag)?.push(project)
                    }
                }

                const newLines = formatProjectsByTags(lineTag[1], projectsByTag);
                writeLines(state, newLines)
                break;
            case MainTags.index:
                var distinctTags = new Set<string>()
                for (const project of projects) {
                    for (const tag of project.tags) {
                        distinctTags.add(tag)
                    }
                }
                // I hate javascript
                distinctTags = new Set([...distinctTags].sort())
                for (const tag of distinctTags) {
                    writeLine(state, `- [${capitalize(tag)}](#${tag.replaceAll(' ', '-')})`)
                }

                break;
        }
    }
    return state.content;
}


