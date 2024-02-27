---
layout: post
title:  "Indexování Googlem"
date:   2024-03-04 07:00:00 +0200
last_modified_at: 2024-03-04 07:00:00 +0200
category: Blogování
css_class: blogovani
read_time: 1 min 32 s
description: Indexování Googlem a Google Search Console. Tvůj blog není k nalezení na Googlu? Problém je pravděpodobně v tom, že ho ještě nenavštívil Googlebot!
excerpt: Indexování Googlem a Google Search Console. Tvůj blog není k nalezení na Googlu? Problém je pravděpodobně v tom, že ho ještě nenavštívil Googlebot!
permalink: blogovani/indexovani-googlem
---

[Předchozí [Google Analytics]]({% post_url blogovani/2024-02-29-google-analytics %})

Jestli tvůj blog není k nalezení přes Google, jsi tu správně. Mrkneme se na indexování a jeho manuální vyžádání přes Google Search Console.

A jak zjistíš, jestli je blog mezi výsledky vyhledávání na Googlu? Zadej do vyhledávání *site:url-stranky* (v mém případě tedy např. site:https://kaelwi.github.io/ pro hlavní stránku blogu; funguje stejně i u všech podstránek). Pokud nevyjede vůbec nic, pak o tobě Google neví.

## Co je vůbec to indexování

"Stránka je indexována Googlem, pokud ji navštívil prohledávač Googlu (Googlebot), byl analyzován její obsah a význam a byla uložena do indexu Google. Indexované stránky se mohou zobrazovat ve výsledcích Vyhledávání Google (pokud splňují základní požadavky Vyhledávání Google)." (Zdroj: [Nápověda Search Console](https://support.google.com/webmasters/answer/7645831?hl=cs)).

Jenže... denně na webu přibývají kvanta nových stránek a proto je možné, že se k tvým Googlebot prostě ještě nedostal (a může to klidně ještě i pár týdnů trvat). Je tu však možnost si o indexování zažádat a zvýšit tím prioritu tvých stránek u Googlebotu.

## Google Search Console

"Google Search Console je bezplatná služba od společnosti Google, která usnadňuje sledování a správu přítomnosti webu ve výsledcích Vyhledávání Google." (Zdroj: [Nápověda Search Console](https://support.google.com/webmasters/answer/7645831?hl=cs)).

Po registraci a vytvoření tzv. property a prokázání, že jsi jejím vlastníkem, se můžeš podívat na data o tom, jaké stránky a podstránky Google už zaindexoval.

Pokud Google o tvých stránkách neví, můžeš si zažádat o jejich indexování. K tomu klikneš v levém menu na *URL inspection* nebo se rovnou posuneš do políčka pro vyhledávání URL nahoře. Tam zadáš odkaz na svůj blog, případně jeho podstránku. No a buď ti vyjede zelené "URL is on Google", nebo se zobrazí šedivá hláška, že URL není zaindexována a tom případě je k dispozici i tlačítko "Request indexing".

## Sitemap

Práci vyhledávačům usnadní i tzv. sitemap. Je to soubor, který obsahuje všechny informace o vašich stránkách, včetně např. toho, kdy byly naposledy aktualizovány.

S Jekyllem je možné použít plugin, který sitemap vytvoří automaticky. V souboru _config.yml přidej pod pluginy *jekyll-sitemap* a v souboru Gemfile přidej řádek *gem "jekyll-sitemap"*.

Soubor sitemap bude automaticky vytvořen pod odkazem https://url-tveho-blogu/sitemap.xml. Tento odkaz pak už jen hodíš do Google Search Console (v menu nalevo by měl být podbod *Sitemaps*).

## Kam dál?

*TBD. Začínám tento měsíc s novým tutoriálem, tak prosím o trpělivost ohledně dalších článků na blog. Základní nastavení je zde k dispozici, tak už budu přidávat jen tehdy, když bude co. Ale příští týden tu shrnu všechny změny na šabloně Minimy, které je možné vidět u mě na blogu.*
