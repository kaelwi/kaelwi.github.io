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

1. Zkontrolujte si, zda máte, případně nainstalujte Ruby, RugyGems, Make a GCC. Na [stránkách Jekyllu](https://jekyllrb.com/docs/installation/) k tomu naleznete podrobnější návod.

2. Nainstalujte jekyll a bundler.

{% highlight console %}
gem install jekyll bundler
{% endhighlight %}

## První nástřel

Jekyll blog můžete buďto vytvořit od píky sami, nebo si vezmete na pomoc již předvytvořené šablony. Druhou variantu jsem zvolila i já, k první se možná někdy vrátím, ale momentálně je mojí prioritou nasdílet nějaký obsah a ne 100%  personalizace blogu.

Pokud se někdy vrhnu na variantu č. 1, určitě sem hodím, jak jsem na to šla. Pokud byste to chtěli vyzkoušet sami, mrkněte na [dokumentaci](https://jekyllrb.com/docs/step-by-step/01-setup/) jekyllu.

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

## Kam dál?

*\-TBD\-*

{% comment %} [Základní konfigurace]({% post_url blogovani/2023-06-26-zakladni-konfigurace-blogu %}) {% endcomment %}
