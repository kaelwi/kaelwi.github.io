---
layout: post
title:  "Strings - příklady"
date:   2024-05-30 07:00:00 +0200
last_modified_at: 2024-05-30 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 3 min 39 s
description: Příklady na procvičování práce s textovými řetězci.
excerpt: Příklady na procvičování práce s textovými řetězci.
permalink: programovaci-jazyk-c/strings-priklady
---

[Předchozí [Argumenty předané programu z příkazového řádku]]({% post_url c/2024-05-23-argumenty-z-prikazoveho-radku %})

Jako vždy platí, že programování je potřeba procvičovat. To se jen tak čtením mých příspěvků nenaučíte. Ideálně, pokud si zkusíte i sami pogooglit nějaké příklady, případně zkusíte naprogramovat věci, které vás samotné napadnou. Programování a zkoušení není nikdy dost! I vytváření chyb je poučné - naučí vás to nebát se chybových hlášek, číst je, hledat jejich původ a třeba i experimentovat s možnými řešeními.

<!-- TODO -->

## String pozpátku

Zkuste si napsat prográmek, který spustíte s argumentem, kterým bude slovo, které má program vyhodit pozpátku. Práci s argumenty z příkazového řádku jsme si ukázali v [předchozí kapitole]({% post_url c/2024-05-23-argumenty-z-prikazoveho-radku %}). Ukazatel na argv ukazuje na první písmeno. Dá se použít na místě argumentu pro funkci, která má v parameter listu datové pole (proč tomu tak je, se dozvíte už brzy v kapitole o ukazatelích). Např. toto je v C možné a třeba se to bude hodit při řešení tohoto příkladu:

{% highlight c %}
void stringPozpatku(char string[])
{
    // ...
}

int main(int argc, char* argv[])
{
    // ...
    char* slovo = argv[1];
    stringPozpatku(slovo);
    // ...
}
{% endhighlight %}

V případě datových polí a ukazatelů je třeba mít na paměti, že funkce nepracují s kopií, nýbrž s jednou a tou samou proměnnou, resp. s jedním a tým samým místem v paměti. Cokoliv tedy provedete ve funkci stringPozpatku s oním slovem se projeví i v main a kdekoliv jinde, kde se odkazujete na ono slovo.

Pro řešení se vám bude možná hodit i funkce strlen, která je z knihovny string.h (pro použití je třeba ji nahoře přidat pomocí #include <string.h>).

<!--- solution -->
  <details>
    <summary><u>Možné řešení:</u></summary>
<br />
{% highlight c %}
#include <stdio.h>
#include <string.h>

void stringReverse(char string[])
{
  int len = strlen(string);

  for (int pismeno = 0; pismeno < len / 2; pismeno++)
  {
    // temp abysme neztratili to, co je na prvnim miste, protoze to na dalsim radku prepiseme
    char temp = string[pismeno];
    string[pismeno] = string[len - 1 - pismeno];
    string[len - 1 - pismeno] = temp;
  }
}

int main(int argc, char* argv[])
{
  if (argc != 2)
  {
    printf("Spust prosim program a udej pritom slovo, ktere chces otocit.\n");
    return -1;
  }

  char* slovo = argv[1];

  printf("Zadane slovo: %s\n", slovo);
  stringReverse(slovo);
  printf("Slovo pozpatku: %s\n", slovo);

  return 0;
} {% endhighlight %}

(<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-30-strings-priklady/string-rev.c" target="_blank">Odkaz na GitHub</a>)
<br /><br />

Naší main jsme tentokrát napsali tak, abysme měli přístup k argumentům. A jako první ve funkci main kontrolujeme, jestli je počet argumentů v pořádku - měly by být 2, jeden pro název, kterým jsme program spustili, jeden pro argument, který vlastně chceme předat.
<br /><br />

Následně si odchytíme 2. argument, ve kterém je slovo, které si přejeme otočit. Toto slovo pak předáváme funkci stringReverse. Tato funkce nám nic nevrací, protože pracuje přímo na onom slovu, změny se projeví i v main.
<br /><br />

Při prohazování písmenek musíme jít pouze do poloviny délky slova, ale za to z obou stran. Prohazujeme první s posledním, druhé s předposledním, atd. A abysme nic nepřepsali předtím, než se opravdu prohodí, potřebujeme dočasnou proměnnou (často nazývaná zkráceně temp (temporary)).
</details>
<br />

## Palindrom

Palindrom je sekvence, kterou lze číst zleva i zprava stejně. Například "abba" je palindrom, případně také "Kobyla má malý bok" (při vynechání diakritiky a mezer to i program tak vyhodnotí).

Napiště program, který opět přijme slovo přes příkazový řádek a zhodnotí, zda se jedná o palindrom.

<!--- solution -->
  <details>
    <summary><u>Možné řešení:</u></summary>
<br />
{% highlight c %}
#include <stdio.h>
#include <string.h>

int stringPalindrom(char string[])
{
  // nezapomente, ze index bez od 0 -> na indexu strlen(string) uz jste o jedno misto za slovem!
  int konec = strlen(string) - 1;
  
  for (int i = 0; i < konec; i++, konec--)
  {
    if (string[i] != string[konec])
    {
      return 0;
    }
  }

  return 1;
}

int main(int argc, char* argv[])
{
  printf("-----\nPalindrome check\n-----\n\n");
  if (argc != 2)
  {
    printf("Spust prosim program a udej pritom slovo, ktere chces otestovat.\n");
    return -1;
  }

  char* slovo = argv[1];

  printf("Zadane slovo: %s\n", slovo);

  if (stringPalindrom(slovo))
  {
    printf("Slovo je palindrom!\n");
  }
  else 
  {
    printf("Slovo neni palindrom.\n");
  }
  
  return 0;
} {% endhighlight %}

(<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-30-strings-priklady/string-palindrom.c" target="_blank">Odkaz na GitHub</a>)
<br /><br />

Stejně jako u předchozího příkladu. Naší main jsme napsali tak, abysme měli přístup k argumentům. A jako první ve funkci main kontrolujeme, jestli je počet argumentů v pořádku - měly by být 2, jeden pro název, kterým jsme program spustili, jeden pro argument, který vlastně chceme předat.
<br /><br />

Následně si odchytíme 2. argument, ve kterém je slovo, které si přejeme otestovat. Toto slovo pak předáváme funkci stringPalindrom. Tato funkce má návratovou hodnotu int, protože chceme rozhodnout zda něco je či není palindrom. A v Céčku je hodnota 0 nepravda, jakákoli jiná pak pravda, což je vlastnost, kterou následně můžeme použít například v if-podmínce.
<br /><br />

V samotné stringPalindrom funkci následně porovnáváme první a poslední písmenko tak dlouho, dokud se oba indexy nesejdou uprostřed (dokud nejsou stejné). Pokud se na nějakém místě obsah pole neshoduje, pak vracíme 0 (nepravdu). Pokud celá smyčka doběhne do konce, znamená to, že se neobjevila žádná neshoda a můžeme vracet hodnotu jinou než 0.
</details>
<br />

## Kam dál?

*TBD. Určitě sis všiml/-a hashtagů na začátku zdrojového kódu. Příště je trochu demystifikuju a objasním, k čemu slouží.*

{% comment %} [Preprocesor]({% post_url c/2024-06-06-preprocesor %}) {% endcomment %}
