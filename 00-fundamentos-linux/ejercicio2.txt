### 2. Mediante comandos de bash, vuelca el contenido de file1.txt a file2.txt y mueve file2.txt a la carpeta empty

El resultado de los comandos ejecutados sobre la jerarquía anterior deben dar el siguiente resultado.

```bash
foo/
├─ dummy/
│  ├─ file1.txt
├─ empty/
  ├─ file2.txt
```

Donde `file1.txt` y `file2.txt` deben contener el siguiente texto:

```bash
Me encanta la bash!!
```
Resolucion:
Comandos ejecutados:
1. cat foo/dummy/file1.txt > foo/dummy/file2.txt
    ***frangnu@LAPTOP-NFUJ412F:/mnt/c/Windows/System32$ cat foo/empty/file2.txt
        Me encanta la bash!

****frangnu@LAPTOP-NFUJ412F:/mnt/c/Windows/System32$ cat foo/dummy/file1.txt
        Me encanta la bash!

2. mv foo/dummy/file2.txt foo/empty/
    ***frangnu@LAPTOP-NFUJ412F:/mnt/c/Windows/System32$ ls -R foo
        foo:
        dummy  empty

        foo/dummy:
        file1.txt

        foo/empty:
        file2.txt