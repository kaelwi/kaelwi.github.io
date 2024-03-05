---
layout: post
title:  "Google Analytics"
date:   2024-02-29 07:00:00 +0200
last_modified_at: 2024-02-29 07:00:00 +0200
category: Blogování
css_class: blogovani
read_time: 1 min 9 s
description: Propojení blogu s Google Analytics.
excerpt: Návod, jak propojit blog s Google Analytics.
permalink: blogovani/google-analytics
---

[Předchozí [Title = title \| description???]]({% post_url blogovani/2024-02-26-title-tag-title-description %})

Google Analytics je analytický nástroj, kterým je možné sledovat dění na webových stránkách. Máte tu možnost vidět například počet aktivních uživatelů, z jaké země se na stránku podívali, z jakého zařízení, jaké podstránky navštívili, jak dlouho se zdrželi a mnoho dalšího.

## Založení účtu

Pro proklikání bude třeba vyplnit následující:
- account
- property (časové pásmo a měnu si nastavte podle sebe)
- detaily o podnikání
- cíle podnikání

Potom budete při procesu vyzváni k výběru zdroje dat. V případu blogu to bude web. Následně zadáte adresu webu a pojmenujete proud dat z tohoto zdroje.

Nakonec by mělo vyskočit okno s instrukcemi pro instalaci. Defaultně se zobrazí návod pro instalaci Wordpress a podobné. My se proklikneme k manuální instalaci.

## Propojení s blogem

Aby to všechno fungovalo s Jekyllem, je třeba vložit kód, který se zobrazil po zvolení možnosti manuální instalace. Tenhle kód vložíme do souboru, který pojmenujeme *google-analytics.html* a uložíme do složky *_includes*. 

Nakonec ještě do konfiguračního souboru _config.yml vložíme tento řádek:

{% highlight yml %}
google_analytics: "measurement id"
{% endhighlight %}

Přičemž místo textu *measurement id* zadáte vlastní ID, které jste dostali při založení účtu a web streamu na Google Analytics (k nalezení pod *Web stream details*).

Toť vše! Může chvíli trvat, než se začnou na GA (zkratka pro Google Analytics) zobrazovat nějaká data. Ale nejpozději do 48 hod tam uvidíte alespoň svoje návštěvy vlastního blogu. 

Pro více detailů k využití a použití GA mrkněte do jejich Academy či na Google jako takový. A jinak - *have fun*. Alespoň mě baví sledovat, jestli, kdy a jak se zvedá návštěvnost.

## Kam dál?

[Indexování Googlem]({% post_url blogovani/2024-03-04-indexovani-googlem %})
