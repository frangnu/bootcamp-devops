#!/bin/bash

# Fichero temporal
FICHERO="pagina_descargada.html"

# Comprobar que se pasan exactamente dos parámetros
if [ $# -ne 2 ]; then
    echo "Se necesitan únicamente dos parámetros para ejecutar este script"
    exit 1
fi

# Asignar parámetros
URL="$1"
PALABRA="$2"

# Descargar y comprobar éxito
echo "Descargando contenido de $URL..."
if ! curl -sS "$URL" -o "$FICHERO"; then
    echo "Error descargando $URL"
    exit 2
fi

# Contar apariciones (búsqueda insensible a mayúsculas, coincidencias literales)
CONTADOR=$(grep -F -i -o "$PALABRA" "$FICHERO" | wc -l)

if [ "$CONTADOR" -eq 0 ]; then
    echo "No se ha encontrado la palabra \"$PALABRA\""
else
    # Encontrar la línea donde aparece por primera vez
    PRIMERA_LINEA=$(grep -F -i -n "$PALABRA" "$FICHERO" | head -n 1 | cut -d: -f1)
    
    # Diferencia entre 1 aparición y múltiples
    if [ "$CONTADOR" -eq 1 ]; then
        echo "La palabra \"$PALABRA\" aparece 1 vez"
        echo "Aparece únicamente en la línea $PRIMERA_LINEA"
    else
        echo "La palabra \"$PALABRA\" aparece $CONTADOR veces"
        echo "Aparece por primera vez en la línea $PRIMERA_LINEA"
    fi
fi

# (Opcional) eliminar el fichero descargado
# rm -f "$FICHERO"
