### 3. Crear un script de bash que agrupe los pasos de los ejercicios anteriores y además permita establecer el texto de file1.txt alimentándose como parámetro al invocarlo

Si se le pasa un texto vacío al invocar el script, el texto de los ficheros, el texto por defecto será:

```bash
Que me gusta la bash!!!!
```

Resolución:

#!/bin/bash

TEXTO="$1"
if [ -z "$TEXTO" ]; then
  TEXTO="Que me gusta la bash!!!!"
fi

mkdir -p foo/dummy foo/empty
echo "$TEXTO" > foo/dummy/file1.txt
> foo/dummy/file2.txt
cat foo/dummy/file1.txt > foo/dummy/file2.txt
mv foo/dummy/file2.txt foo/empty/