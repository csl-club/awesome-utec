# Guía de contribución

## Añadir tu proyecto a la lista

> [!WARNING] Requerimientos
> Para agregar tu proyecto, se deben cumplir las siguientes condiciones:
>
> 1. Debes ser actualmente estudiante de la UTEC.
> 2. El proyecto debe ser **open source** (código abierto), así que debería tener un repositorio público.
> 3. ¡El proyecto debe ser **awesome**! Esta lista es para proyectos que genuinamente te gustaría presumir al resto del mundo.

### 1. Hacer un fork

Para hacer los cambios, te recomendamos trabajar en un [**fork**][about-forks] del repositorio. Puedes hacerlo mediante el botón de "fork" arriba a la derecha de la página principal del repo.

<!-- TODO: add fork button screenshot -->

En este punto, puedes clonar tu recién creado fork localmente a tu computadora y trabajar desde tu editor de código favorito.

### 2. Agregar tu proyecto a `content.yml`

La información de los proyectos se encuentra en `content.yml`. En general, **probablemente puedas guiarte de los proyectos existentes en la lista**, pero de todas maneras detallamos aquí los formatos relevantes.

#### Autores

> [!IMPORTANT]
> Si es tu primera vez añadiendo un proyecto a la página, debes agregarte como autor a esta lista.

Como es posible que exista más de un proyecto de un mismo autor, evitamos la duplicidad de la información de los autores colocándola por separado de la lista de proyectos.

Cada autor tiene una ID, la cual se coloca como key (llave) en el objeto `authors`. Un autor debe incluir la siguiente información:

```typescript
interface AuthorData {
	// Nombre a mostrar del autor. Debe ser tu nombre real.
	name: string;

	// Correo del autor.
	email?: string;
}
```

Especificar `email` no es para nada necesario y todavía no se usa para nada, pero tenemos planes de (posiblemente) agregar alguna funcionalidad a la página para ver más información sobre los autores.

#### Proyectos

```typescript
interface ProjectData {
	// Nombre a mostrar para el proyecto.
	name: string;

	// IDs del autor (o autores) del proyecto, tal y como aparecen
	// como llaves en `authors`.
	authors: string[];

	// Una breve descripción del proyecto.
	summary?: string;

	// Temas y tópicos sobre los que trata el proyecto.
	// Deben estar en minúscula y en kebab-case.
	tags: string[];

	// Repositorio de tu proyecto.
	// - Si tu repo está en GitHub: "github:usuario/repo".
	// - Si tu repo está en GitLab: "gitlab:usuario/repo".
	// Caso contrario, simplemente coloca la URL del repo.
	repo: string;

	// Lenguaje de programación principal del proyecto.
	lang?: string;
}
```

Los fields opcionales (`summary` y `lang`), de no estar presentes, se jalan automáticamente del repositorio (si este es de GitHub o GitLab y has usado correctamente el formato de `repo`).

### 2. Generar el README

Una vez que hayas añadido tu proyecto a la lista, debes **actualizar el README** para que lo muestre. Para ello, basta con que ejecutes el script `readmegen`.

Este proyecto usa [pnpm], un reemplazo extremadamente rápido para npm. Instálalo si no lo tienes todavía, y ejecuta `pnpm install` en el directorio del proyecto para instalar las dependencias.

<details>
<summary><strong>Opcional:</strong> Usar un token de GitHub</summary>

Dado que usamos la API de GitHub para obtener información adicional sobre los proyectos y que son _varios_ los proyectos para los que se jala esta información, es posible que GitHub **limite tus requests**, con lo que el script podría fallar. Para asegurarte de que no ocurra esto, puedes [generar un token de GitHub][gen-token] que el script pueda usar para autenticar sus requests, y colocarlo en un archivo de nombre `.env` como un contenido como el siguiente:

```bash
GITHUB_TOKEN="<tu token aquí>"
```

Esto reducirá las posibilidades de que GitHub te haga un rate limit al ejecutar `readmegen`.

</details>

Habiendo hecho esto, simplemente ejecuta este comando:

```bash
pnpm run readmegen
```

Si tus cambios siguen el formato, no debería arrojar errores. De lo contrario, te podría salir un error con un mensaje como, por ejemplo, "`Validation failed: projects.4.authors: Required`".

Este script generará el README tanto en el mismo directorio del proyecto como una copia en el directorio `static`.

### 3. Hacer commit

Ahora, debes hacer commit con tus cambios a `content.yml` y los READMEs actualizados. El nombre del commit debe ser "`feat(content): add <repo>`". Por ejemplo:

```bash
git commit -m "feat(content): add github:OcZi/Alfajor"
```

Un hook de [husky](https://github.com/typicode/husky), parte del proyecto, revisará algunas cosas del proyecto antes de finalizar el commit. Si todo está bien, no debería arrojar errores. Una vez hecho el commit, envía tus cambios a tu fork en GitHub con `git push`.

### 4. Abrir un pull request

Finalmente, deberás [abrir un pull request][pull-requests] en este repositorio. Este PR debe tener título igual al mensaje del commit que hiciste en el paso 3.

Revisaremos tu contribución cuanto antes. Si todo cuadra, lo aceptaremos y tu proyecto estará presente en Awesome UTEC. ¡Éxitos!

[about-forks]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks
[gen-token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic
[pnpm]: https://pnpm.io/
[pull-requests]: https://github.com/csl-club/awesome-utec/pulls
