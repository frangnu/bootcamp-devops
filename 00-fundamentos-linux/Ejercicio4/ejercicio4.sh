#!/bin/bash

# URL constante de la página web a descargar
URL="http://metaphorpsum.com/paragraphs/3"
FICHERO="pagina_descargada.html"

# Verificar que se proporciona un parámetro
if [ $# -eq 0 ]; then
    echo "Uso: $0 <palabra>"
    exit 1
fi

PALABRA=$1

# Descargar el contenido de la página web
echo "Descargando contenido de $URL..."
curl -s "$URL" > "$FICHERO"

# Contar cuántas veces aparece la palabra
CONTADOR=$(grep -io "$PALABRA" "$FICHERO" | wc -l)

# Si la palabra no aparece
if [ $CONTADOR -eq 0 ]; then
    echo "No se ha encontrado la palabra \"$PALABRA\""
else
    # Si la palabra aparece, mostrar el número de apariciones
    echo "La palabra \"$PALABRA\" aparece $CONTADOR veces"
    
    # Encontrar la línea donde aparece por primera vez
    PRIMERA_LINEA=$(grep -in "$PALABRA" "$FICHERO" | head -1 | cut -d: -f1)
    echo "Aparece por primera vez en la línea $PRIMERA_LINEA"
fi

