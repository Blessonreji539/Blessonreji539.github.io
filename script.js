let projects=[];
async function loadProjects(){
  try {
    const response = await fetch('projects.json', {cache:'no-store'});
    if (!response.ok) throw new Error('HTTP '+response.status);
    projects = await response.json();
    document.querySelectorAll('[data-project-index]').forEach(card => {
      const index = Number(card.dataset.projectIndex);
      card.addEventListener('click', () => openProject(index));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(index); }
      });
    });
  } catch (error) {
    console.error('Unable to load projects.json', error);
    const note=document.createElement('p');
    note.className='load-warning';
    note.textContent='Project details could not load. Open this website using a local server or GitHub Pages.';
    document.getElementById('projects')?.appendChild(note);
  }
}
const dialog=document.getElementById('project-dialog');const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));function openProject(id){const p=projects[id];const blocks=[['Engineering Problem',p.problem],['Project Goal',p.goal],['Engineering Solution & My Contribution',p.solution],['Testing, Results & Outcome',p.result],['Five-Sentence Project Description',p.description]];document.getElementById('dialog-content').innerHTML=`<div class="detail-head"><small>${escapeHTML(p.category)} · ${p.year}</small><h2>${escapeHTML(p.title)}</h2></div>${blocks.map(([a,b])=>`<div class="detail-block"><h3>${a}</h3><p>${escapeHTML(b)}</p></div>`).join('')}<div class="tags">${p.tags.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}</div><div class="detail-block"><h3>Technical Skills</h3><div class="tags">${p.technical_skills.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}</div></div><div class="detail-block"><h3>Software, Hardware & Tools</h3><div class="tags">${p.software_tools.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}</div></div>${p.illustrative?`<p class="illustration-note">AI concept illustration — not a photograph of completed work.</p>`:""}${p.images.length?`<div class="gallery">${p.images.map((im,i)=>`<a href="${im}" target="_blank" rel="noopener"><img loading="lazy" src="${im}" alt="${escapeHTML(p.title)} project photo ${i+1}"></a>`).join('')}</div>`:''}`;dialog.showModal()}document.getElementById('close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('menu').onclick=()=>document.getElementById('navlinks').classList.toggle('active');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.getElementById('navlinks').classList.remove('active'));
loadProjects();
