---
layout: post
title:  "Opakování - kalkulačka"
date:   2024-04-25 07:00:00 +0200
last_modified_at: 2024-05-02 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 3 min 45 s
description: Opakování doposud probraného, včetně funkcí, na příkladu jednoduché kalkulačky psané v programovacím jazyku C.
excerpt: Opakování doposud probraného, včetně funkcí, na příkladu jednoduché kalkulačky psané v programovacím jazyku C.
permalink: programovaci-jazyk-c/opakovani-kalkulacka
---

[Předchozí [Funkce v C]]({% post_url c/2024-04-18-funkce %})

Dnes si naprogramujeme jednoduchou kalkulačku. Dřív, než se podíváte na řešení, vyzkoušejte si implementaci sami. Opravdu, věřte mi. Jenom čtením kódu se programovat nenaučíte, je potřeba samostatně zkoušet, chybovat a znovu zkoušet.

*Upozorňuju, že se moje řešení může (a pravděpodobně bude) od vašeho lišit! Každý má jiné nápady, jiné myšlenkové pochody. V normálním světě, tam venku, by body, kde se názory rozcházejí, byly předmětem diskuze, případně by ideálně byly rovnou součástí specifikace (např. po poradě se zákazníkem). Pokud vaše řešení dělá to, co má, je to v pořádku. Pokud se budete držet zásady, že každá funkce má plnit jenom jednu úlohu, rozdělíte kód, budete ho udržovat hezky čitelný, o to lépe.*

Začneme tím, že si vytvoříme základní kostru. Každý program potřebuje main-funkci, dodatečně k této hlavní funkci se zamyslíme i nad tím, jaké další funkcionality by naše kalkulačka měla mít.

Nejdříve se zamyslíme nad tím, co naše kalkulačka musí umět a jak to budeme testovat. Přičemž testování bude zatím nejjednodušší pomocí printf v mainu. A naše kalkulačka by měla umět sčítat, odečítat, násobit a dělit.

<!-- 1. krok -->

  <details>
    <summary><u>První základní kostra by mohla vypadat následovně: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int scitani(int a, int b)
{
    return a + b;
}

int odecitani(int a, int b)
{
    return 0;
}

int nasobeni(int a, int b)
{
    return 0;
}

// TODO: deleni

int main(void)
{
    printf("Test: %d\n", scitani(5, 3));
    return 0;
} {% endhighlight %}

Předpokládejme, že naše kalkulačka zatím umí počítat jenom s celými čísly. Implementace sčítání, odečítání a násobení by tedy neměla být těžká. Sčítání můžu otestovat v mainu a výsledek si nechat vytisknout na konzoli.

Zkuste si sami doplnit kód pro odečítání a násobení (momentálně tyto dvě funkce vrací pouze hodnotu 0).
  </details>
<br />

Podařilo se vám naimplementovat odečítání a násobení? Vyzkoušeli jste, jestli funkce vrací požadovanou hodnotu? Pokud ano, tak se můžeme vrhnout na dělení.

<!-- 2. krok -->

  <details>
    <summary><u>Dělení: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int scitani(int a, int b)
{
    return a + b;
}

int odecitani(int a, int b)
{
    return 0;
}

int nasobeni(int a, int b)
{
    return 0;
}

double deleni(int a, int b)
{
    if (b == 0)
    {
        printf("Chyba: deleni nulou!\n");
        return -1;
    }

    return (double) a / b;
}

int main(void)
{
    printf("Test: %f\n", deleni(5, 3));
    return 0;
} {% endhighlight %}

Nezapomeňte u dělení dát návratnou hodnotu double - pokud byste dali int, pak by se vždy vracelo pouze celé číslo a tudíž (většinou) nesprávný výsledek. A také je třeba dopsat u return double, protože int děleno int je vždy int a tedy výpočet je celé číslo, i přesto, že je následně vráceno na volajícího ve formě desetinného čísla (opět - zkuste si (double) vynechat a mrkněte, co se stane).

V případě, že je dělitel 0, funkce má vytisknout na konzoli chybovou hlášku. Vrátit by se mohlo jakékoli číslo, např. -1 (nebo i 1, 2 atd., prostě jiné než 0). Mezi programátory se ustálilo, že jakékoli jiné číslo než 0 značí chybu. Např. <a href="https://stackoverflow.com/questions/204476/what-should-main-return-in-c-and-c" target="_blank">zde</a> je hezky popsáno, co znamená návratové hodnota main.

Také si ohlídejte format specifier u printf v mainu. Tentokrát je třeba %f, protože jako argument máme desetinné číslo.
  </details>
<br />

Hurá, pokud jste se dostali až sem, tak už váš program počítá! Ale nezůstaneme jenom u toho. Zatím jsme čísla předávali v kódu. Zkuste si o čísla říct uživateli (připomínám kapitolu o [scanf]({% post_url c/2024-04-11-scanf %})).

<!-- 3. krok -->

  <details>
    <summary><u>User input: </u></summary>
<br />
{% highlight c %}
int main(void)
{
    int a, b;

    printf("Prosim zadejte 2 cisla (oddelena mezerou): ");
    scanf("%d %d", &a, &b);

    printf("Test: %f\n", deleni(a, b));
    return 0;
} {% endhighlight %}

Ostatní funkce zůstávají stejné, momentálně pracujeme jenom v main. Nejprve je potřeba si někde určit 2 proměnné, ve kterých následně uložíme čísla, která nám dodá uživatel. A načtení textu dosáhneme pomocí scanf, jak jsme viděli v <a href="https://kaelwi.github.io/programovaci-jazyk-c/scanf">předposlední kapitole</a>.
  </details>
<br />

Skvělé, uživatel dokáže určit, se kterými čísly bude chtít počítat. Už zbývá jenom nechat ho rozhodnout, kterou operaci by rád provedl a následně pomocí větvení provést vybranou početní operaci. Zkuste si příklad dořešit nejdříve sami.

<!-- 4. krok -->

  <details>
    <summary><u>Výsledný kód by mohl vypadat takto: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int scitani(int a, int b)
{
    return a + b;
}

int odecitani(int a, int b)
{
    return a - b;
}

int nasobeni(int a, int b)
{
    return a * b;
}

double deleni(int a, int b)
{
    if (b == 0)
    {
        printf("Chyba: deleni nulou!\n");
        return -1;
    }

    return (double) a / b;
}

int main(void)
{
    int a, b;
    char operace;

    printf("Prosim zvolte operaci (+, -, *, /): ");
    scanf("%c", &operace);

    printf("Prosim zadejte 2 cisla (oddelena mezerou): ");
    scanf("%d %d", &a, &b);

    double vysledek;

    switch (operace)
    {
    case '+':
        vysledek = scitani(a, b);
        break;
    case '-':
        vysledek = odecitani(a, b);
        break;
    case '*':
        vysledek = nasobeni(a, b);
        break;
    case '/':
        vysledek = deleni(a, b);
        break;
    default:
        printf("Neplatna operace!\n");
        return -1;
    }

    printf("Vysledek: %d %c %d = %.2f\n", a, operace, b, vysledek);
    return 0;
}
 {% endhighlight %}

<!-- TODO -->
Kód je jako vždy dostupný na <a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-25-opakovani-kalkulacka/calculator.c" target="_blank">GitHubu</a>.
  </details>
<br />

Gratuluju všem, kdo se prokousali až sem. Vím, že začátky nejsou jednoduché. Pokud něčemu nerozumíte, klidně se ozvěte na [Discordu](https://discord.gg/hB8UYAgwUE) nebo tady dole v komentářích. Nezpomeňte, že žádná otázka není blbá otázka a pravděpodobně nebudete první ani poslední, co si takovou nebo podobnou otázku klade.

## Kam dál?

[Další příklady]({% post_url c/2024-05-02-dalsi-priklady %}) 
