---
layout: post
title:  "Úvod do programování v jazyce C"
date:   2023-07-05 10:20:00 +0200
last_modified_at: 2023-08-18 14:00:00 +0200
category: Programovací jazyk C
read_time: 3 min 6 s
description: V prvním díle mého úvodu do programování v jazyce C si ukážeme příkazový řádek, nainstalujeme WSL a přeložíme a spustíme první C program.
excerpt: V prvním díle mého úvodu do programování v jazyce C si ukážeme příkazový řádek, nainstalujeme WSL a přeložíme a spustíme první C program.
permalink: programovaci-jazyk-c/uvod-do-programovani-v-jazyce-c
---

Na úvod si vyjasněme pár pojmů, informací a funkcí.

Je potřeba si uvědomit, že náš počítač vlastně nerozumí jazyku C. Počítače rozumí strojovému kódu, který sestává z 0 a 1, které tvoří instrukce pro tzv. CPU (central processing unit, zkráceně také procesor). Procesor je ta část počítače, která zpracovává výpočty, proto také výpočetní technika.

Různé procesory pracují jinak. Proto je také nutné psát různé programy, pokud mají fungovat s různými procesory. Navíc se to celé zkomplivovává v případě, že se programuje pro různé operační systémy.

Ale protože pro člověka není strojový kód čitelný, existují jazyky vyšší úrovně, tzv. high level jazyky. Mezi takové jazyky patří i programovací jazyk C (který je následně pro počítač překládán do strojového kódu).

## Crash course na příkazový řádek

V plánu je používat linuxové příkazy. Pokud na vašem počítači neběží Linux a nemáte v plánu přeinstalovávat celý operační systém, je možnost využít počítač virtuální (např. Oracle VM VirtualBox), nebo WSL (the Windows Subsystem for Linux). Obě varianty můžete pogooglit a vyzkoušet.

Po instalaci WSL a Linux distribuce Ubuntu 22.04 a zadání názvu účtu a hesla to u mě vypadá následovně:

![Screenshot WSL](/assets/images/wsl.JPG)

Text nyní zobrazený ve WSL je tzv. prompt. Na začátku stojí jméno uživatele, za zavináčem název stroje a na konci cesta ke složce, ve které se právě nacházíme.

Komunikace v programování probíhá ve většině případů v angličtině. Rovněž kód, komentáře v něm obsažené, nebo dokumentace či další písemné náležitosti, by měli být psané v angličtině, aby informací v nich obsažených mohli využít i jiní vývojáři (třeba i jinde na světě).

Složce se v angličtině říká *folder*, nebo také *directory*.

Pro zobrazení obsahu složky, ve které se právě nacházíte, využijete příkaz ls. Zadáte-li do Googlu (nebo příkazového řádku) *man ls*, zjistíte, že je možné provést příkaz ls s dodatečnými parametry, tzv. *options*. Příkaz ls vyjede seznam složek a souborů nacházejících se ve složce.

![Screenshot WSL, příkazy ls a ls -l](/assets/images/wsl_ls.JPG)

Chcete-li se dostat do tzv. *home directory* uživatele, proveďte následující příkaz:

```console
cd ~
```

Příkaz potvrdíte klávesou Enter.

Příkaz *cd* znamená *change directory*. Vlnka nahoře značí domovskou složku. Je ale možné zadat také absolutní cestu (všechny mezikroky/složky mezi domovskou složkou a hledanou složkou), nebo relativní cestu (cestu vzhledem k aktuální pozici). Samotná tečka značí aktuální složku, 2 tečky složku o úroveň výše. Mám-li tedy v domovské složce složku test a v ní složku inner_test, mohla by navigace mezi složkami vypadat následovně:

![Screenshot WSL, příkaz cd](/assets/images/wsl_cd.JPG)

Všimněte si, že prompt vždy ukazuje absolutní cestu.

Pokud byste si chtěli otevřít složku ve Windows Exploreru (prohlížeči souborů), dosáhnete toho pomocí následujícího příkazu:

```console
explorer.exe .
```

Pozor, nezapomeňte na tečku na konci.

## Od kódu k programu

K programování budeme potřebovat textový editor nebo IDE (vývojové prostředí, *integrated development environment*) a překladač (compiler). Já sama budu používat atom nebo Notepad++ (textové editory) a VSCodium (IDE), překladač mám clang. Další možnosti představuje z textových editorů např. gedit (Linux), atom, vim, nebo emacs (cross-platform), z vývojových prostředí např. Geany nebo CLion, jiný překladač by mohl být gcc.

Po instalaci WSL se mi nepodařilo spustit správně příkaz *sudo apt install clang*. Pokud i u vás dojde k problémům, zkuste nejdříve provést *sudo apt-get update* a následně znovu *sudo apt install clang*. Nelekejte se, chvilku to trvá a ve WSL se vám bude postupně objevovat hromada textu.

Podařilo-li se vše, zkusme si teď vytvořit, přeložit a spustit první program!

{% highlight c %}
#include <stdio.h>
int main(void) {
  printf("hi");
  return 0;
}
{% endhighlight %}

(Program výše naleznete i na GitHubu pod [tímto odkazem](https://github.com/wild-karoline/C/blob/main/01_uvod-do-programovani-v-jazyce-c/hi.c)).

Pro moje potřeby jsem si v domovské složce ve WSL vytvořila složku pro prográmky v C, v ní pak soubor *hi.c* (všimněte si koncovky, která značí, že se jedná o soubor v jazyce C), který jsem si otevřela ve VSCodium. Potom, co jsem uložila změny provedené v souboru, jsem ho přes příkazový řádek přeložila a spustila. Použila jsem následující příkazy (přičemž jsem startovala v domovské složce):

```console
mkdir C
cd C
touch hi.c
codium hi.c
clang hi.c
./a.out
```

Prvním příkazem vytvoříte složku C. Druhým příkazem se do ní přesunete. Třetím příkazem vytvoříte soubor hi.c, příkazem *codium hi.c* soubor otevřete ve VSCodium. Po uložení změn soubor přeložíte pomocí *clang hi.c*, který vám vytvoří tzv. *executable*, spustitelný soubor s názvem *a.out*. Takový soubor spustíte pomocí posledního příkazu.

Pokud se vše podařilo, měli byste ve WSL okně vidět *hi*. Gratuluji k napsání, překladu a spuštění vašeho prvního programu! 😄.

## Kam dál?

[První program, datové typy a printf]({% post_url c/2023-07-07-prvni-program-datove-typy-a-printf %})
