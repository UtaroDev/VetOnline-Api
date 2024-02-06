import { Router } from 'express'
import { readdirSync } from 'node:fs'

// Obtiene la ruta del directorio actual donde se encuentra este archivo
const PATH_ROUTES = `${__dirname}`

// Crea un enrutador de Express
const router = Router()

// Función para eliminar la extensión ".ts" de un nombre de archivo
const cleanFileName = (fileName: string) => {
  return fileName.replace('.ts', '')
}

// Lee y procesa los archivos en el directorio
readdirSync(PATH_ROUTES).forEach((file) => {
  // Limpia el nombre del archivo
  const cleanFile = cleanFileName(file)

  // Verifica si el nombre del archivo no es "index"
  if (cleanFile !== 'index') {
    // Realiza una importación dinámica del módulo de ruta correspondiente, esto devuelve una proemesa ya que puede ser asincronico
    import(`./${cleanFile}`)
      .then((moduleRouter) => {
        // Agrega el enrutador exportado del módulo bajo una ruta correspondiente
        router.use(`/${cleanFile}`, moduleRouter.router)
      })
      .catch((err) => {
        console.log(err) // Captura y registra errores de importación
      })
  }
})

// Exporta el enrutador principal que incluye todas las rutas importadas dinámicamente
export { router }
