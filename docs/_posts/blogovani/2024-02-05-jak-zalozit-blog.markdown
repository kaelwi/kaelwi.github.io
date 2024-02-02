---
layout: post
title:  "Jak založit blog"
date:   2024-02-05 07:00:00 +0200
last_modified_at: 2024-02-05 07:00:00 +0200
category: Blogování
read_time: 1 min 7 s
description: Úvod do blogování s Jekyllem. Ukážu vám, jak si můžete zdarma založit a spustit blog. První díl se věnuje instalaci.
excerpt: Úvod do blogování s Jekyllem. Ukážu vám, jak si můžete zdarma založit a spustit blog. První díl se věnuje instalaci.
permalink: blogovani/jak-zalozit-blog
---

*Už nějaký ten pátek si pohrávám s myšlenkou založit si blog. Nic speciálního, jen můj vlastní prostor pro sdílení myšlenek. Po dlouhém rozmýšlení a zvažování, jak na to (a hromady pročtených online postů a návodů), jsem se nakonec rozhodla prostě vyzkoušet štěstí s Jekyllem. Ptáte se proč zrovna Jekyll? Jednoduše proto, že je zdarma a spustit to celé nakonec můžu přes GitHub, který je taktéž k dispozici bezplatně. Ideál na zkoušení nových věcí.*

Takže jak na to? Níže stručně sepsané kroky nezbytné ke spuštění.

## Instalace

1. Zkontrolujte si, zda máte, případně nainstalujte Ruby, RugyGems, Make a GCC. Na [stránkách Jekyllu](https://jekyllrb.com/docs/installation/){:target="_blank"} k tomu naleznete podrobnější návod.

*Poznámka: Příkazy provádíme v příkazovém řádku. Kdo si neví rady, [dole](https://kaelwi.github.io/blogovani/jak-zalozit-blog#příkazový-řádek) je k tomu krok za krokem průvodce (screenshoty).*

2. Nainstalujte jekyll a bundler.

{% highlight console %}
gem install jekyll bundler
{% endhighlight %}

## První nástřel

Jekyll blog můžete buďto vytvořit od píky sami, nebo si vezmete na pomoc již předvytvořené šablony. Druhou variantu jsem zvolila i já, k první se možná někdy vrátím, ale momentálně je mojí prioritou nasdílet nějaký obsah a ne 100%  personalizace blogu.

Pokud se někdy vrhnu na variantu č. 1, určitě sem hodím, jak jsem na to šla. Pokud byste to chtěli vyzkoušet sami, mrkněte na [dokumentaci](https://jekyllrb.com/docs/step-by-step/01-setup/){:target="_blank"} jekyllu.

Pro druhou variantu je potřeba provést následující příkazy:

{% highlight console %}
jekyll new mujblog
{% endhighlight %}

- pričemž mujblog nahraďte názvem svého blogu

{% highlight console %}
cd mujblog
{% endhighlight %}

- tímto příkazem přejdete do nově vytvořené složky s názvem vašeho blogu

{% highlight console %}
bundle exec jekyll serve
{% endhighlight %}

- tímto příkazem lokálně zpřístupníte stránku, kterou následně můžete otevřít v prohlížeči pod [http:localhost:4000](http:localhost:4000) (pozor, nezavírejte okno s příkazovým řádkem)
- jekyll new vám vytvoří blog s již vytvořenou stránkou "About" a prvním postem a tématem (šablonou) "Minima"

## Příkazový řádek

K příkazovému řádku se dostanete buďto tak, že v průzkumníku souborů kliknete do adresy, místo ní zadáte cmd a stisknete Enter. Nebo tak, že ve Start menu zadáte cmd a stisknete Enter. Výhodou první varianty je, že se vám příkazový řádek otevře v tom umístění, kde jste ho zadali v prohlížeči souborů a nemusíte se tedy komplikovaně dostávat přes příkazy do požadované složky (příkazem "cmd", k tomu se teď rozepisovat nebudu, je však možné si to vygooglit - buď přímo mrknout po cmd, případně hledat, jak navigovat mezi složkami ve Windowsu v příkazovém řádku).

Tady pár screenshotů ode mě, jak se dostat k příkazovému řádku ve složce Dokumenty:

{% include image.html url="/assets/images/blogovani/explorer.JPG" description="1" %}

{% include image.html url="/assets/images/blogovani/explorer2.png" description="2" %}

{% include image.html url="/assets/images/blogovani/explorer3.png" description="3" %}

{% include image.html url="/assets/images/blogovani/explorer4.png" description="4" %}

## Kam dál?

*\-TBD\-*

{% comment %} [Základní konfigurace]({% post_url blogovani/2023-06-26-zakladni-konfigurace-blogu %}) {% endcomment %}
