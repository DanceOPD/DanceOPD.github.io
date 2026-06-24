(function () {
  const progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
  }, { passive: true });

  const tocLinks = document.querySelectorAll('d-contents nav a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        tocLinks.forEach((link) => link.classList.toggle('toc-active', link.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-18% 0px -72% 0px', threshold: 0 });
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const group = btn.closest('.tabs').dataset.group;
      document.querySelectorAll(`.tabs[data-group="${group}"] .tab-btn`).forEach((b) => b.classList.remove('active'));
      document.querySelectorAll(`.tab-panel[data-group="${group}"]`).forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-group="${group}"][data-panel="${target}"]`)?.classList.add('active');
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('[data-zoom]').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.getAttribute('alt') || 'Zoomed figure';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Interactive exact-overview image hotspots. The visible pixels stay the
  // byte-identical manuscript PNG; these generated data regions make each
  // radial bar / scatter point inspectable like an EasyChart figure.
  const overviewFigure = document.getElementById('overviewFigure');
  if (overviewFigure) {
    const overviewStage = overviewFigure.querySelector('.overview-image-stage');
    const overviewLayer = overviewFigure.querySelector('.overview-image-content') || overviewStage;
    const overviewTitle = document.getElementById('overviewReadoutTitle');
    const overviewText = document.getElementById('overviewReadoutText');
    const overviewHotspots = [{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"bg-chg","value":"6.153","x":49.213,"y":9.524,"ww":2.913,"hh":19.876},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"subj-rep","value":"5.850","x":17.402,"y":11.387,"ww":3.701,"hh":18.841},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"subj-rep","value":"5.310","x":44.173,"y":15.321,"ww":3.15,"hh":14.907},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"bg-chg","value":"5.173","x":22.992,"y":15.528,"ww":2.441,"hh":13.872},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"subj-rep","value":"5.857","x":13.78,"y":15.735,"ww":5.276,"hh":17.391},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"subj-rep","value":"5.026","x":19.921,"y":16.563,"ww":2.283,"hh":12.836},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"subj-rep","value":"5.214","x":16.378,"y":17.598,"ww":3.701,"hh":13.872},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"subj-rep","value":"5.549","x":40.472,"y":17.805,"ww":4.803,"hh":15.321},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"subj-rep","value":"4.683","x":46.299,"y":19.048,"ww":2.126,"hh":10.352},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"bg-chg","value":"4.610","x":50.315,"y":20.497,"ww":2.441,"hh":9.731},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"subj-rep","value":"4.647","x":43.386,"y":21.325,"ww":2.913,"hh":10.145},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"bg-chg","value":"4.467","x":24.094,"y":21.532,"ww":2.283,"hh":8.696},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"bg-chg","value":"4.502","x":51.339,"y":22.567,"ww":2.677,"hh":9.11},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"style-chg","value":"5.944","x":53.937,"y":23.188,"ww":6.772,"hh":14.493},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"bg-chg","value":"4.242","x":25.118,"y":24.224,"ww":1.811,"hh":6.625},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"style-chg","value":"4.772","x":52.283,"y":24.224,"ww":3.071,"hh":9.11},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"style-chg","value":"4.497","x":26.063,"y":25.88,"ww":2.677,"hh":7.453},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"style-chg","value":"5.218","x":27.717,"y":26.501,"ww":5.039,"hh":11.18},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"subj-add","value":"5.008","x":39.134,"y":27.122,"ww":4.488,"hh":10.352},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"subj-add","value":"4.882","x":13.228,"y":27.743,"ww":4.173,"hh":9.731},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"subj-add","value":"5.488","x":10.866,"y":29.193,"ww":5.906,"hh":10.766},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"style-chg","value":"5.232","x":54.567,"y":30.642,"ww":5.354,"hh":9.524},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"subj-add","value":"4.704","x":39.055,"y":32.091,"ww":3.937,"hh":7.867},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"subj-add","value":"6.014","x":8.819,"y":32.298,"ww":7.48,"hh":10.352},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"style-chg","value":"3.957","x":28.346,"y":35.197,"ww":2.047,"hh":4.969},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"subj-add","value":"4.524","x":38.976,"y":36.439,"ww":3.543,"hh":6.211},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"style-chg","value":"4.303","x":28.819,"y":37.474,"ww":2.756,"hh":4.555},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"style-chg","value":"4.012","x":55.039,"y":38.095,"ww":2.126,"hh":4.762},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"subj-add","value":"5.681","x":9.291,"y":38.302,"ww":6.693,"hh":7.246},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"GenEval","value":"0.848","x":36.85,"y":39.13,"ww":5.354,"hh":6.418},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"color-alt","value":"5.075","x":55.276,"y":40.166,"ww":4.252,"hh":5.797},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"color-alt","value":"4.679","x":29.134,"y":40.58,"ww":3.465,"hh":5.383},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"GenEval","value":"0.818","x":10.551,"y":47.619,"ww":5.433,"hh":6.211},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"GenEval","value":"0.798","x":38.189,"y":47.619,"ww":4.016,"hh":5.59},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"color-alt","value":"4.840","x":29.055,"y":48.033,"ww":4.409,"hh":5.797},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"color-alt","value":"5.812","x":55.276,"y":48.033,"ww":7.087,"hh":7.246},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"GenEval","value":"0.833","x":9.921,"y":50.518,"ww":6.299,"hh":8.903},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"GenEval","value":"0.822","x":36.85,"y":50.518,"ww":5.591,"hh":8.282},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"color-alt","value":"4.793","x":28.74,"y":50.725,"ww":4.331,"hh":7.039},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"color-alt","value":"5.037","x":54.961,"y":50.725,"ww":4.961,"hh":7.867},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"GenEval","value":"0.814","x":11.732,"y":53.209,"ww":5.039,"hh":9.317},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"GenEval","value":"0.827","x":37.087,"y":53.209,"ww":5.827,"hh":10.352},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"color-alt","value":"4.588","x":28.346,"y":53.623,"ww":3.543,"hh":7.246},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"color-alt","value":"4.977","x":54.488,"y":53.623,"ww":4.646,"hh":8.696},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"GEdit","value":"5.347","x":10.551,"y":55.901,"ww":6.772,"hh":14.493},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"GEdit","value":"5.498","x":36.772,"y":55.901,"ww":6.772,"hh":14.286},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"color-alt","value":"4.679","x":27.638,"y":56.108,"ww":3.78,"hh":8.696},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"color-alt","value":"5.075","x":53.858,"y":56.108,"ww":4.724,"hh":10.559},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"GEdit","value":"4.528","x":15.984,"y":60.041,"ww":2.992,"hh":9.11},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"GEdit","value":"4.736","x":41.811,"y":60.248,"ww":3.386,"hh":10.145},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"subj-rem","value":"5.310","x":25.984,"y":60.455,"ww":4.409,"hh":13.872},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"subj-rem","value":"4.348","x":52.205,"y":60.455,"ww":2.677,"hh":7.867},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"GEdit","value":"4.947","x":16.614,"y":61.905,"ww":3.307,"hh":12.008},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"GEdit","value":"4.661","x":43.228,"y":61.905,"ww":2.913,"hh":10.145},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"subj-rem","value":"4.681","x":25.039,"y":62.112,"ww":2.913,"hh":10.145},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"subj-rem","value":"4.025","x":51.26,"y":62.112,"ww":1.969,"hh":5.797},{"kind":"bar","chart":"A · T2I + Edit","method":"Flow-OPD","metric":"GEdit","value":"4.854","x":18.268,"y":63.147,"ww":2.756,"hh":11.594},{"kind":"bar","chart":"A · T2I + Edit","method":"DiffusionOPD","metric":"subj-rem","value":"5.211","x":23.937,"y":63.147,"ww":3.071,"hh":14.286},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Flow-OPD","metric":"GEdit","value":"4.679","x":44.646,"y":63.147,"ww":2.52,"hh":10.352},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DiffusionOPD","metric":"subj-rem","value":"4.462","x":50.157,"y":63.147,"ww":2.283,"hh":8.903},{"kind":"bar","chart":"A · T2I + Edit","method":"DanceOPD","metric":"GEdit","value":"5.347","x":19.528,"y":63.975,"ww":2.52,"hh":15.321},{"kind":"bar","chart":"A · T2I + Edit","method":"Off-Policy","metric":"subj-rem","value":"3.797","x":22.835,"y":63.975,"ww":1.575,"hh":3.934},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"DanceOPD","metric":"GEdit","value":"5.498","x":45.669,"y":63.975,"ww":2.598,"hh":16.356},{"kind":"bar","chart":"B · Local Edit + Global Edit","method":"Off-Policy","metric":"subj-rem","value":"4.336","x":49.055,"y":63.975,"ww":1.89,"hh":7.867},{"kind":"point","chart":"T2I × Edit capability space","method":"DanceOPD","metric":"DanceOPD point","value":"T2I 0.849, Edit 5.347","note":"Best upper-right student; compact marker denotes low per-step cost.","x":86.772,"y":36.853,"ww":2.047,"hh":5.383},{"kind":"point","chart":"T2I × Edit capability space","method":"DiffusionOPD","metric":"DiffusionOPD point","value":"T2I 0.833, Edit 4.947","note":"Strong edit point but lower T2I/Edit frontier than DanceOPD.","x":79.291,"y":44.099,"ww":4.331,"hh":11.387},{"kind":"point","chart":"T2I × Edit capability space","method":"Flow-OPD","metric":"Flow-OPD point","value":"T2I 0.814, Edit 4.854","note":"Large marker indicates much higher training cost.","x":75.433,"y":47.205,"ww":5.827,"hh":15.321},{"kind":"point","chart":"T2I × Edit capability space","method":"Off-Policy","metric":"Off-Policy Distill. point","value":"T2I 0.818, Edit 4.528","note":"Cheap but off-distribution distillation sits lower in edit quality.","x":74.331,"y":57.35,"ww":2.283,"hh":6.004},{"kind":"point","chart":"T2I × Edit capability space","method":"Joint","metric":"Joint point","value":"","note":"Joint training is a compromise baseline in the capability-space panel.","x":67.008,"y":48.654,"ww":2.598,"hh":6.625},{"kind":"point","chart":"T2I × Edit capability space","method":"Teacher","metric":"Edit teacher","value":"","note":"Edit teacher anchor in the T2I × Edit space.","x":66.929,"y":48.654,"ww":2.283,"hh":6.004},{"kind":"point","chart":"T2I × Edit capability space","method":"Teacher","metric":"T2I teacher","value":"","note":"T2I teacher anchor near the bottom axis.","x":79.37,"y":70.6,"ww":2.835,"hh":6.418}];

    function describeOverviewHotspot(item) {
      if (item.kind === 'bar') {
        return {
          title: `${item.chart} · ${item.metric} · ${item.method}`,
          text: `Score ${item.value}. Hover/click is aligned to the original colored bar; the manuscript image underneath is unchanged.`
        };
      }
      return {
        title: `${item.chart} · ${item.metric}`,
        text: item.value ? `${item.value}. ${item.note || ''}` : (item.note || 'Capability-space anchor from the original figure.')
      };
    }

    function setOverviewHotspot(item, persist = false, button = null) {
      const copy = describeOverviewHotspot(item);
      overviewFigure.querySelectorAll('.overview-hotspot').forEach((spot) => spot.classList.toggle('active', persist && spot === button));
      if (overviewTitle) overviewTitle.textContent = copy.title;
      if (overviewText) overviewText.textContent = copy.text;
    }

    overviewHotspots.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `overview-hotspot overview-data-hotspot ${item.kind === 'point' ? 'point-hotspot' : 'bar-hotspot'}`;
      button.style.setProperty('--x', `${item.x}%`);
      button.style.setProperty('--y', `${item.y}%`);
      button.style.setProperty('--w', `${item.ww}%`);
      button.style.setProperty('--h', `${item.hh}%`);
      button.setAttribute('aria-label', `${item.chart} ${item.metric} ${item.method}`);
      const label = document.createElement('span');
      label.textContent = item.kind === 'bar' ? `${item.method} · ${item.metric} · ${item.value}` : `${item.metric}`;
      button.appendChild(label);
      button.addEventListener('mouseenter', () => setOverviewHotspot(item, false, button));
      button.addEventListener('focus', () => setOverviewHotspot(item, false, button));
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        setOverviewHotspot(item, true, button);
      });
      overviewLayer?.appendChild(button);
    });
  }

  window.copyBibTeX = function (btn) {
    const text = document.getElementById('bibtex-block').textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      const old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = old; }, 1500);
    });
  };
})();
