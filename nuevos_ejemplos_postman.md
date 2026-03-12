# Nuevos Ejemplos para Postman

Sigue este orden para evitar errores de IDs.

## 1. Cliente (Puerto 3000)
**POST** `http://localhost:3000/api/clientes`
```json
{
    "nombre": "Lucía Méndez",
    "email": "lucia.mendez@outlook.com"
}
```

## 2. Universidad (Puerto 3000)
**POST** `http://localhost:3000/api/universidades`
```json
{
    "nombre": "UPB - Medellín",
    "direccion": "Circular 1 # 70-01",
    "telefono": "3544530"
}
```

## 3. Tipo de Proyecto (Puerto 3000)
**POST** `http://localhost:3000/api/tipos-proyecto`
```json
{
    "nombre": "articulo"
}
```

## 4. Etapa (Puerto 3000)
**POST** `http://localhost:3000/api/etapas`
```json
{
    "nombre": "entrega parcial 1"
}
```

## 5. Proyecto (Puerto 4000)
**POST** `http://localhost:4000/api/proyectos`

> [!IMPORTANT]
> Debes reemplazar los valores de abajo por los IDs reales que te devuelva Postman arriba.

```json
{
    "numero": "PROY-004",
    "titulo": "Análisis de Ciberseguridad en Redes Locales",
    "descripcion": "Estudio predictivo sobre vulnerabilidades en redes empresariales pequeñas.",
    "fechaIniciacion": "2026-06-01",
    "fechaEntrega": "2026-08-15",
    "cliente": "PEGAR_ID_DE_LUCIA_AQUI",
    "universidad": "PEGAR_ID_DE_UPB_AQUI",
    "tipoProyecto": "PEGAR_ID_DE_ARTICULO_AQUI",
    "etapa": "PEGAR_ID_DE_ENTREGA_PARCIAL_1_AQUI",
    "valor": 980000
}
```
