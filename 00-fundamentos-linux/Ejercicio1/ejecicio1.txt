### 1. Crea mediante comandos de bash la siguiente jerarquía de ficheros y directorios

```bash
foo/
├─ dummy/
│  ├─ file1.txt
│  ├─ file2.txt
├─ empty/
```

Donde `file1.txt` debe contener el siguiente texto:

```bash
Me encanta la bash!!
```

Y `file2.txt` debe permanecer vacío.


Resolución:
Comandos ejecutados:
1. mkdir -p foo/dummy foo/empty
2. echo "Me encanta la bash!!" > foo/dummy/file1.txt
3. touch foo/dummy/file2.txt
4. ls -R foo:
    - foo/dummy:
        file1.txt  file2.txt
    - foo/empty: