var conta = 0;
var acougue = 0;
var farmacia = 0;
var padaria = 0;
scanf("%d", "conta");
scanf("%d", "acougue");
scanf("%d", "farmacia");
scanf("%d", "padaria");
var soma = acougue + farmacia + padaria;

if (conta >= soma) {
  printf("%d", "3");
}
else {
  soma = acougue + farmacia;
  if (conta >= soma) {
    printf("%d", "2");
  } else {
    soma = acougue + padaria;
    if (conta >= soma) {
      printf("%d", "2");
    } else {
      soma = farmacia + padaria;
      if (conta >= soma) {
        printf("%d", "2");
      } else {
        if (conta >= acougue || conta >= padaria || conta >= farmacia)
          printf("%d", "1");
        else {
          printf("%d", "0");
        }
      }
    }

  }
}

