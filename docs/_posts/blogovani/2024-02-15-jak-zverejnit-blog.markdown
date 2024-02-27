---
layout: post
title:  "Jak  zveřejnit blog"
date:   2024-02-15 07:00:00 +0200
last_modified_at: 2024-02-20 18:00:00 +0200
category: Blogování
read_time: 2 min 32 s
description: Úvod do blogování s Jekyllem. Spuštění blogu na GitHub Pages (stále vše zdarma).
excerpt: Úvod do blogování s Jekyllem. Spuštění blogu na GitHub Pages (stále vše zdarma).
permalink: blogovani/jak-zverejnit-blog
---

[Předchozí [Jak  vytvořit příspěvek na blog]]({% post_url blogovani/2024-02-12-jak-vytvorit-prispevek %})

## ... aneb využití GitHub Pages

Každý uživatel má možnost využít prostor na doméně github.io (případně propojit stránky s vlastní doménou). A protože jakákoli stránka generovaná Jekyllem skvěle souzní s GitHub Pages a ještě je to zdarma, tak i já jsem se rozhodla se prozatím vydlábnout na vlastní doménu a placené hostování jinde a vyzkoušet tuto možnost.

## Co je to vlastně GitHub

GitHub jsem poznala hlavně jako možnost kolaborace na vývoji softwaru a jeho verzování pomocí nástroje Git. Když na to bude chvilka, určitě se na GitHub zaměřím více a zkusím vysvětlit možnosti, které nabízí. Pro začátek blogování ale stačí vědět, jak tam soubory nahrajeme a jak stránku spustíme pomocí GitHub Pages.

## Registrace

Nejdříve si založte účet na [GitHubu](https://github.com/){:target="_blank"}. Nic speciálního není potřeba, pouze vyplnit povinná políčka a klasicky se proklikat registrací.

## Zveřejnění blogu

1. Kroky na github.com:

    a. Pokud už jste přihlášení, tak klikněte v pravém horním rohu na kolečko s vaším avatarem.

    ![Screenshot tlačítka na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/gh-profil.png)

    b. Mělo by ze strany/ze shora vyjet menu. Zde zvolte "Your repositories".

    ![Screenshot menu na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/gh-repos.png)

    c. Zde zvolte v horní části "New".

    ![Screenshot přehledu repositories na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/gh-new-repo.png)

    d. Vyplňte jméno uložiště na GitHubu (repository) a klikněte na "Create repository".

    ![Screenshot stránky na vytvoření nového repository na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/gh-create-new-repo.png)

2. Kroky v průzkumníku souborů a příkazovém řádku:

    a. Přejděte do složky, kde se nachází soubory k vašemu blogu, klikněte do řádku s adresou a místo adresy tam napište "cmd" a potvrďte klávesou Enter:

    ![Screenshot tlačítka na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/pruzkumnik-souboru.png)

    ![Screenshot tlačítka na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/pruzkumnik-souboru-adresa.png)

    ![Screenshot tlačítka na GitHubu](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/pruzkumnik-souboru-adresa-cmd.png)

    b. Naťukejte a potvrďte klávesou Enter následující příkazy:

    ```console
    > git init
    > git remote add origin *URl k vašemu GitHub repository*
    > git add .
    > git commit -m "Nepovinná, informativní zpráva"
    > git push
    ```

    Pokud git push nebude fungovat a dostanete tip, jak s chybou naložit (jako já), proveďte navrhovaný příkaz.

    ![Screenshot chyby při git push](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/git-push.JPG)

    Pravděpodobně bude potřeba zadat přihlašovací údaje při git push. GitHub nově nepracuje s heslem, ale s tzv. tokenem. K vygenerování tokenu se proklikáte následovně: Avatar vpravo nahoře - Settings - Developer Settings (úplně dole) - Personal Access Tokens - Fine grained tokens. Vygenerovaný token pak zadáte namísto hesla.

    Vyskočí-li vám jakákoli další chybová hláška, zkopírujte ji a zadejte do Googlu. Nebo napište, když budu mít čas, můžeme na to mrknout společně.

3. Zpátky na GitHub:
   Najeďte na vaše repository (přes ikonu avatara a "Your repositories", kde kliknete na předtím vytvořené repository). Zde pod "Settings" najdete sekci "Pages".

   Já mám kód ve složce docs, tedy to u mě vypadá následovně:

   ![Screenshot GitHub Pages](/assets/images/blogovani/2024-02-15-jak-zverejnit-blog/gh-pages.JPG)

   Nahoře hned vidíte, pod jakou adresou je možné stránku rozkliknout. Jakékoli změny provedete, pokud je pushnete na GitHub, zobrazí se vám i na stránce.

## Poznámka k úpravám provedeným v souborech Minima

Možná jste si stejně jako já všimli, že vám na GitHub Pages zmizela Discord ikonka (pokud jste ji se mnou v předposledním díle přidali). To proto, že změny jsme provedli jen u sebe lokálně a nedali o tom vědět na GitHubu.

Správný postup při provádění změn u šablon a témat je ten, že si vytvoříte kopii souborů ve složce s obsahem vašeho blogu a tu následně upravujete.

V našem případě tedy vytvoříme složku "_includes" (na stejné úrovni jako jsou i složky _posts nebo assets) a do ní zkopírujeme námi upravený social.html. Stejně tak zkopírujeme soubor minima-social-icons.svg do složky assets.

Pokud nyní všechno pushnete (git add ., git commit -m "Přidány upravené soubory Minimy", git push) na GitHub, měly by se během chvilky změny promítnout i přímo na vaší stránce, Discord ikonka by tedy měla být vidět i tam.

## Kam dál?

{% comment %} *TBD. Pokud se ti náhodou při zveřejňování stalo, že se příspěvek nezobrazil ihned, tak ti v příštím příspěvku povím, co by mohlo být důvodem a jak to napravit. Článek očekávej v pondělí 19.2.2024.* {% endcomment %}

[Příspěvek se nezobrazuje?]({% post_url blogovani/2024-02-19-prispevek-se-nezobrazuje %})
