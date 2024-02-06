"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const node_fs_1 = require("node:fs");
// Obtiene la ruta del directorio actual donde se encuentra este archivo
const PATH_ROUTES = `${__dirname}`;
// Crea un enrutador de Express
const router = (0, express_1.Router)();
exports.router = router;
// Función para eliminar la extensión ".ts" de un nombre de archivo
const cleanFileName = (fileName) => {
    return fileName.replace('.ts', '');
};
// Lee y procesa los archivos en el directorio
(0, node_fs_1.readdirSync)(PATH_ROUTES).forEach((file) => {
    // Limpia el nombre del archivo
    const cleanFile = cleanFileName(file);
    // Verifica si el nombre del archivo no es "index"
    if (cleanFile !== 'index') {
        // Realiza una importación dinámica del módulo de ruta correspondiente, esto devuelve una proemesa ya que puede ser asincronico
        Promise.resolve(`${`./${cleanFile}`}`).then(s => __importStar(require(s))).then((moduleRouter) => {
            // Agrega el enrutador exportado del módulo bajo una ruta correspondiente
            router.use(`/${cleanFile}`, moduleRouter.router);
        })
            .catch((err) => {
            console.log(err); // Captura y registra errores de importación
        });
    }
});
