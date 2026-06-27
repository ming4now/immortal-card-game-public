import{n as e,t}from"./main-aB6mcgCN.js";var n={A:10,B:20,C:30},r=`
.scene-dialogue-toast {
    position: fixed;
    top: 72px;
    left: 50%;
    z-index: 100000;
    width: min(520px, calc(100vw - 32px));
    padding: 14px 18px 14px 20px;
    border: 1px solid rgba(243, 156, 18, 0.55);
    border-left: 4px solid #f39c12;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.95));
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.38), 0 0 24px rgba(243, 156, 18, 0.12);
    color: #fff;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -12px);
    transition: opacity 0.22s ease, transform 0.22s ease;
}

.scene-dialogue-toast.show {
    opacity: 1;
    transform: translate(-50%, 0);
}

.scene-dialogue-speaker {
    margin-bottom: 6px;
    color: #f39c12;
    font-size: 14px;
    font-weight: 700;
}

.scene-dialogue-text {
    color: #f8fafc;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.45;
}

.scene-dialogue-source {
    margin-top: 6px;
    color: #94a3b8;
    font-size: 11px;
}

@media (max-width: 768px) {
    .scene-dialogue-toast {
        top: 56px;
        padding: 12px 14px;
    }

    .scene-dialogue-text {
        font-size: 14px;
    }
}
`,i=[],a=`idle`,o=null;function s(){if(document.getElementById(`scene-dialogue-style`))return;let e=document.createElement(`style`);e.id=`scene-dialogue-style`,e.textContent=r,document.head.appendChild(e)}function c(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function l(e){return e?typeof e==`object`?String(e.chapter||``).trim():String(e).split(/\s*\/\s*/)[0].trim():``}function u(e,t,n){if(typeof t==`string`){let r=t.trim();return r?{id:`${e.id}:line:${n}`,_lineKey:`${e.id}:line:${n}`,text:r,source:e.source}:null}if(!t||typeof t!=`object`||typeof t.text!=`string`)return null;let r=t.text.trim();if(!r)return null;let i=t.id||t.quoteHash||`${e.id}:line:${n}`;return{...t,id:t.id||i,_lineKey:i,text:r,source:t.source||e.source}}function d(e){return Array.isArray(e?._lines)?e._lines:e?.text?[u(e,{id:`${e.id}:text`,text:e.text,source:e.source},0)].filter(Boolean):[]}function f(e){if(!e?.id||!e?.trigger||!e?.speakerHeroId)return null;let t=Array.isArray(e.lines)?e.lines.map((t,n)=>u(e,t,n)).filter(Boolean):[];if(t.length===0&&e.text){let n=u(e,{id:`${e.id}:text`,text:e.text,source:e.source},0);n&&t.push(n)}return t.length===0?null:{...e,_lines:t}}function p(e){return(Array.isArray(e?.scenes)?e.scenes:[]).map(f).filter(Boolean).sort((e,t)=>(n[e.priority]||99)-(n[t.priority]||99))}function m(e){return e?._lineKey||e?.id||e?.quoteHash||e?.text||``}function h(e){let t=Number(e?.weight);return Number.isFinite(t)&&t>0?t:1}function g(e){let t=e.reduce((e,t)=>e+h(t),0),n=Math.random()*t;for(let t of e)if(n-=h(t),n<=0)return t;return e[e.length-1]||null}function _(e){return!Array.isArray(e)||e.length===0?null:e[Math.floor(Math.random()*e.length)]||null}function v(e){return n[e?.priority]||99}function y(e,t){let n=d(t);if(n.length<=1)return n[0]||null;e.sceneDialogueLineHistory||=new Map,e.sceneDialogueLineHistory.has(t.id)||e.sceneDialogueLineHistory.set(t.id,new Set);let r=e.sceneDialogueLineHistory.get(t.id),i=n.filter(e=>!r.has(m(e)));i.length===0&&(r.clear(),i=n);let a=g(i);return a&&r.add(m(a)),a}function b(){return a===`loaded`||a===`failed`?Promise.resolve(i):o||(a=`loading`,o=fetch(e(`data/scene-dialogues.json`)).then(e=>{if(!e.ok)throw Error(`scene-dialogues.json ${e.status}`);return e.json()}).then(e=>(i=p(e),a=`loaded`,i)).catch(e=>(a=`failed`,i=[],console.warn(`[SceneDialogue] failed to load runtime dialogue scenes:`,e.message),i)),o)}function x(e=[],t=[]){if(!Array.isArray(t)||t.length===0)return!1;let n=e.filter(Boolean).map(e=>String(e));return t.some(e=>n.includes(String(e)))}function S(e){return[e.player?.hero?.id,e.opponent?.hero?.id].filter(Boolean)}function C(e,t){return e.player?.hero?.id===t?e.player:e.opponent?.hero?.id===t?e.opponent:null}function w(e,t){return t?typeof e.getOpponent==`function`?e.getOpponent(t):t===e.player?e.opponent:t===e.opponent?e.player:null:null}function T(e){return e?[e.type,e.sect,e.race,e.spiritRoot,...e.tags||[],...e.gameTags||[],...e.taxonomyRefs||[]].filter(Boolean):[]}function E(e={},t){return t?x([t.id],e.cardsAny)||x([t.name],e.cardNamesAny)||x(T(t),e.tagsAny)||x([t.id],e.storyObjectsAny)||x([t.name],e.storyObjectsAny):!1}function D(e){return(e?.field||[]).filter(e=>e?.type===`puppet`||e?.isPuppet||T(e).includes(`傀儡`)||T(e).includes(`puppet`)).length}function O(e,t,n){let r=t.conditions||{},i=S(e),a=C(e,t.speakerHeroId),o=w(e,a||n);return!(!a||r.heroesAll&&!r.heroesAll.every(e=>i.includes(e))||r.heroesAny&&!r.heroesAny.some(e=>i.includes(e))||r.opponentAny&&!r.opponentAny.includes(o?.hero?.id))}function k(e={}){return!!(e.cardsAny?.length||e.cardNamesAny?.length||e.tagsAny?.length||e.storyObjectsAny?.length||e.effectAny?.length||e.skillNamesAny?.length||e.minOwnPuppets)}function A(e,t){let n=e.conditions||{};if(!k(n)||E(n,t.card)||n.minOwnPuppets&&D(t.player)>=n.minOwnPuppets)return!0;let r=[t.skill?.id,t.skill?.name,t.skill?.description,t.skillConfig?.type,t.skillConfig?.description,...t.effects||[]].filter(Boolean);return x(r,n.skillNamesAny)||x(r,n.effectAny)}function j(e,t,n){if(t.trigger===`counter_card`){if(n.type!==`card_play`)return!1;let r=w(e,n.player);return r?.hero?.id===t.speakerHeroId?O(e,t,n.player)&&A(t,{...n,player:r}):!1}return t.trigger!==n.type||!O(e,t,n.player)?!1:t.trigger===`battle_start`||n.player?.hero?.id===t.speakerHeroId?A(t,n):!1}function M(e,t){return i.filter(n=>(n.oncePerBattle===!1||!e.triggeredSceneDialogueIds.has(n.id))&&j(e,n,t))}function N(e,t){let n=Array.from(new Map(t.filter(Boolean).map(e=>[e.id,e])).values());if(n.length===0)return null;let r=Math.min(...n.map(v)),i=_(n.filter(e=>v(e)===r));if(!i)return null;let a=y(e,i);return a?{scene:i,line:a}:null}t.prototype.resetSceneDialogues=function(){this.triggeredSceneDialogueIds=new Set,this.sceneDialogueLineHistory=new Map,this.sceneDialogueTimer&&=(clearTimeout(this.sceneDialogueTimer),null),this.sceneDialogueFlushTimer&&=(clearTimeout(this.sceneDialogueFlushTimer),null),this.pendingSceneDialogueCandidates=[],b()},t.prototype.triggerSceneDialogue=function(e={}){if(this.triggeredSceneDialogueIds||=new Set,a===`failed`)return!1;if(a!==`loaded`)return b().then(()=>this.triggerSceneDialogue(e)),!1;let t=M(this,e);return t.length===0?!1:(this.pendingSceneDialogueCandidates||=[],this.pendingSceneDialogueCandidates.push(...t),this.sceneDialogueFlushTimer||=setTimeout(()=>{this.sceneDialogueFlushTimer=null;let e=this.pendingSceneDialogueCandidates||[];this.pendingSceneDialogueCandidates=[];let t=N(this,e);t&&(t.scene.oncePerBattle!==!1&&this.triggeredSceneDialogueIds.add(t.scene.id),this.showSceneDialogue(t.scene,t.line))},0),!0)},t.prototype.showSceneDialogue=function(e,t=null){s();let n=t||d(e)[0]||e,r=n.speakerHeroId||e.speakerHeroId,i=n.speakerName||C(this,r)?.hero?.name||r,a=n.text||e.text,o=l(n.source||e.source),u=document.getElementById(`scene-dialogue-toast`);a&&(u||(u=document.createElement(`div`),u.id=`scene-dialogue-toast`,u.className=`scene-dialogue-toast`,document.body.appendChild(u)),this.sceneDialogueTimer&&clearTimeout(this.sceneDialogueTimer),u.innerHTML=`
        <div class="scene-dialogue-speaker">${c(i)}</div>
        <div class="scene-dialogue-text">“${c(a)}”</div>
        ${o?`<div class="scene-dialogue-source">${c(o)}</div>`:``}
    `,requestAnimationFrame(()=>{u.classList.add(`show`)}),this.sceneDialogueTimer=setTimeout(()=>{u.classList.remove(`show`)},3200),this.log?.(`💬 ${i}：${a}`,`INFO`,`DIALOGUE`))};