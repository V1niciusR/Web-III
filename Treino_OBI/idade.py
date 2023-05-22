# Ler as idades das irmãs
idade_cibele = int(input("Digite a idade de Cibele: "))
idade_celeste = int(input("Digite a idade de Celeste: "))
idade_camila = int(input("Digite a idade de Camila: "))

# Determinar a idade de Camila
if idade_cibele < idade_celeste:
    if idade_camila < idade_cibele:
        idade_de_camila = idade_cibele
    elif idade_camila > idade_celeste:
        idade_de_camila = idade_celeste
    else:
        idade_de_camila = idade_camila
else:
    if idade_camila < idade_celeste:
        idade_de_camila = idade_celeste
    elif idade_camila > idade_cibele:
        idade_de_camila = idade_cibele
    else:
        idade_de_camila = idade_camila

# Imprimir a idade de Camila
print("A idade de Camila é:", idade_de_camila)
