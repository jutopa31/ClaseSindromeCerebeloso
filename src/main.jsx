import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Eye,
  Footprints,
  GitBranch,
  Microscope,
  Route,
  Stethoscope,
  Zap,
} from 'lucide-react'
import './styles.css'

const tabs = [
  { id: 'anatomia', label: 'Anatomía', icon: Brain },
  { id: 'manifestaciones', label: 'Manifestaciones', icon: Activity },
  { id: 'examen', label: 'Examen físico', icon: Stethoscope },
  { id: 'diferencial', label: 'Diferencial', icon: GitBranch },
]

const overview = [
  {
    icon: Brain,
    title: 'Concepto',
    body: 'El síndrome cerebeloso reúne alteraciones de coordinación, equilibrio, precisión motora, tono y habla por compromiso del cerebelo o sus conexiones.',
  },
  {
    icon: Route,
    title: 'Localización',
    body: 'El vermis se expresa con ataxia axial y marcha inestable; los hemisferios cerebelosos producen signos ipsilaterales de miembros.',
  },
  {
    icon: Microscope,
    title: 'Etiologías',
    body: 'Considerar ACV, intoxicaciones, fármacos, tumores, desmielinización, degeneración, infecciones y causas metabólicas o paraneoplásicas.',
  },
]

const cerebellarParts = [
  {
    name: 'Arquicerebelo',
    aka: 'Vestibulocerebelo',
    tone: 'purple',
    desc: 'Centro funcional de las vías de control del equilibrio.',
    functions: ['Equilibrio estático y dinámico', 'Integración vestibular y visual', 'Postura en bipedestación'],
    lesion: 'Ataxia de tronco, nistagmo y tendencia a caer hacia todos los lados.',
  },
  {
    name: 'Paleocerebelo',
    aka: 'Espinocerebelo',
    tone: 'blue',
    desc: 'Regula el control postural de los músculos antigravitatorios.',
    functions: ['Tono muscular', 'Postura axial', 'Propiocepción medular'],
    lesion: 'Hipotonía, alteración de la marcha y reflejos pendulares.',
  },
  {
    name: 'Neocerebelo',
    aka: 'Cerebrocerebelo',
    tone: 'red',
    desc: 'Coordina la motilidad voluntaria fina y la planificación motora.',
    functions: ['Eumetría e isostenia', 'Sinergia', 'Diadococinesia'],
    lesion: 'Dismetría, adiadococinesia, temblor intencional y descomposición del movimiento.',
  },
]

const functions = [
  { title: 'Eumetría e isostenia', body: 'Movimiento con intensidad y medida exactas para alcanzar el objetivo.' },
  { title: 'Sinergia y diadococinesia', body: 'Coordinación de grupos musculares y movimientos alternantes rápidos.' },
  { title: 'Regulación del tono', body: 'Tono muscular basal adecuado para postura y movimiento.' },
  { title: 'Postura y equilibrio', body: 'Control de estabilidad estática y dinámica.' },
]

const manifestations = {
  estatico: [
    ['Astasia', 'En bipedestación, el paciente oscila con aumento de la base de sustentación. No empeora de forma marcada al cerrar los ojos.'],
    ['Hipotonía muscular', 'Miembros blandos a la movilización pasiva, base frecuente del síndrome cerebeloso.'],
    ['Temblor de actitud', 'Temblor de pequeña amplitud al extender los brazos, diferente del temblor de reposo.'],
    ['Desviaciones posturales', 'Propulsión, retropulsión o lateropulsión según el predominio clínico.'],
  ],
  cinetico: [
    ['Dismetría / hipermetría', 'El movimiento sobrepasa o no alcanza el objetivo, típico en dedo-nariz.'],
    ['Adiadococinesia', 'Incapacidad para movimientos alternantes rápidos, con pérdida de ritmo y amplitud.'],
    ['Asinergia', 'Pérdida de coordinación entre grupos musculares; el movimiento se descompone en partes.'],
    ['Marcha titubeante', 'Base amplia, oscilación del tronco, zigzag y dificultad para el tándem.'],
    ['Reflejos pendulares', 'El segmento oscila varias veces luego del reflejo por hipotonía.'],
  ],
  otro: [
    ['Disartria escandida', 'Habla lenta, monótona, dividida en sílabas, sin afasia.'],
    ['Nistagmo cerebeloso', 'Multidireccional, central y con aumento al mirar hacia la lesión.'],
    ['Macrografía', 'Escritura irregular, letras grandes y temblorosas por dismetría.'],
    ['Crisis cerebelosa de Jackson', 'Opistótonos y rigidez; sugiere compresión de tronco o herniación amigdalina.'],
  ],
}

const exam = [
  {
    name: 'Prueba dedo-nariz',
    type: 'Cinética',
    tone: 'red',
    technique: 'Tocar alternadamente la nariz y el dedo del examinador, con ojos abiertos y luego cerrados.',
    positive: 'Dismetría y temblor intencional que aumenta al acercarse al objetivo.',
    targets: ['Dismetría', 'Temblor intencional', 'Braditeleoquinesia'],
  },
  {
    name: 'Prueba talón-rodilla',
    type: 'Cinética',
    tone: 'red',
    technique: 'En decúbito, colocar el talón sobre la rodilla contralateral y deslizarlo por la tibia.',
    positive: 'El talón cae lateralmente o no mantiene una línea recta.',
    targets: ['Ataxia de MMII', 'Dismetría', 'Asinergia'],
  },
  {
    name: 'Diadococinesia',
    type: 'Cinética',
    tone: 'red',
    technique: 'Pronación y supinación rápidas sobre el muslo o la palma contraria.',
    positive: 'Ritmo lento, irregular y desorganizado.',
    targets: ['Adiadococinesia', 'Asinergia'],
  },
  {
    name: 'Prueba de Romberg',
    type: 'Estática',
    tone: 'blue',
    technique: 'Paciente de pie, pies juntos, brazos a los costados; primero ojos abiertos, luego cerrados.',
    positive: 'En cerebelosos suele ser negativo: oscila con ojos abiertos y no empeora claramente al cerrarlos.',
    targets: ['Ataxia estática', 'Diferencial sensitivo'],
  },
  {
    name: 'Stewart-Holmes',
    type: 'Pasividad',
    tone: 'green',
    technique: 'Resistir la flexión del codo y soltar de forma inesperada.',
    positive: 'El antebrazo golpea el tórax por falta de freno antagonista.',
    targets: ['Hipotonía', 'Asinergia', 'Falta de freno'],
  },
  {
    name: 'Nistagmo',
    type: 'Ocular',
    tone: 'purple',
    technique: 'Seguir el dedo en las posiciones de la mirada.',
    positive: 'Nistagmo multidireccional, sin patrón periférico fijo.',
    targets: ['Nistagmo central', 'Pares craneales'],
  },
]

const differential = [
  ['Romberg', '(-) No empeora al cerrar ojos', '(+) Cae al cerrar ojos', '(+) Cae al cerrar ojos'],
  ['Marcha', 'Titubeante, base amplia, zigzag', 'Taconeante, mira al suelo', 'Desviada siempre al mismo lado'],
  ['Nistagmo', 'Multidireccional, central', 'Ausente', 'Unidireccional, horizonto-rotatorio'],
  ['Dismetría', 'Presente', 'Puede aparecer por propiocepción', 'Ausente'],
  ['Hipotonía', 'Presente', 'Variable', 'Ausente'],
  ['Vértigo', 'Poco frecuente o leve', 'Ausente', 'Intenso, con náuseas/vómitos'],
]

const etiologies = [
  ['Vascular', 'ACV isquémico cerebeloso, hematoma cerebeloso, trombosis venosa.'],
  ['Neoplásico', 'Meduloblastoma, astrocitoma, metástasis, hemangioblastoma.'],
  ['Inflamatorio', 'Cerebelitis viral, esclerosis múltiple, absceso cerebeloso.'],
  ['Tóxico / metabólico', 'Alcohol, fenitoína, hipotiroidismo, Wernicke.'],
  ['Degenerativo', 'Ataxia de Friedreich, SCA, atrofia olivopontocerebelosa.'],
  ['Paraneoplásico', 'Degeneración cerebelosa anti-Yo, anti-Hu u otros anticuerpos.'],
]

function Badge({ children, tone = 'green' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

function InfoBox({ tone = 'info', title, items }) {
  const Icon = tone === 'danger' ? AlertTriangle : tone === 'energy' ? Zap : CheckCircle2
  return (
    <aside className={`info info--${tone}`}>
      <Icon size={20} />
      <div>
        <h3>{title}</h3>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Collapsible({ title, badge, tone = 'green', children }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`collapsible collapsible--${tone} ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>
          {badge && <Badge tone={tone}>{badge}</Badge>}
          <strong>{title}</strong>
        </span>
        <ChevronDown size={18} />
      </button>
      {open && <div className="collapsible__body">{children}</div>}
    </article>
  )
}

function SectionTitle({ number, title, subtitle }) {
  return (
    <header className="section-title">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  )
}

function AnatomyTab() {
  const [selected, setSelected] = useState(cerebellarParts[0].name)

  return (
    <div className="tab-panel">
      <SectionTitle number="01" title="Anatomía y funciones" subtitle="División funcional del cerebelo y consecuencias clínicas." />
      <div className="part-grid">
        {cerebellarParts.map((part) => (
          <button
            className={`part-card part-card--${part.tone} ${selected === part.name ? 'is-selected' : ''}`}
            key={part.name}
            type="button"
            onClick={() => setSelected(part.name)}
          >
            <Badge tone={part.tone}>{part.aka}</Badge>
            <h3>{part.name}</h3>
            <p>{part.desc}</p>
          </button>
        ))}
      </div>
      {cerebellarParts
        .filter((part) => part.name === selected)
        .map((part) => (
          <div className="detail-band" key={part.name}>
            <div>
              <h3>Funciones</h3>
              <ul>
                {part.functions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Síndrome por lesión</h3>
              <p>{part.lesion}</p>
            </div>
          </div>
        ))}
      <div className="overview mini">
        {functions.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <InfoBox
        title="Concepto clave: taxia"
        items={[
          'Taxia significa coordinación normal y armónica de los movimientos voluntarios.',
          'La taxia dinámica evalúa miembros; la estática evalúa postura y equilibrio.',
        ]}
      />
    </div>
  )
}

function ManifestationsTab() {
  const [filter, setFilter] = useState('todos')
  const visibleGroups = Object.entries(manifestations).filter(([group]) => filter === 'todos' || filter === group)

  return (
    <div className="tab-panel">
      <SectionTitle number="02" title="Manifestaciones clínicas" subtitle="Trastornos estáticos, cinéticos y otros signos cerebelosos." />
      <div className="filters" aria-label="Filtrar manifestaciones">
        {[
          ['todos', 'Todos'],
          ['estatico', 'Estáticos'],
          ['cinetico', 'Cinéticos'],
          ['otro', 'Otros'],
        ].map(([id, label]) => (
          <button className={filter === id ? 'is-active' : ''} key={id} type="button" onClick={() => setFilter(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className="manifestation-groups">
        {visibleGroups.map(([group, items]) => (
          <section key={group}>
            <h3>{group === 'estatico' ? 'Trastornos estáticos' : group === 'cinetico' ? 'Trastornos cinéticos' : 'Otros trastornos'}</h3>
            <div className="stack">
              {items.map(([title, body]) => (
                <Collapsible title={title} badge={group} tone={group === 'cinetico' ? 'red' : group === 'otro' ? 'orange' : 'blue'} key={title}>
                  <p>{body}</p>
                </Collapsible>
              ))}
            </div>
          </section>
        ))}
      </div>
      <InfoBox
        tone="energy"
        title="Mnemotecnia DANISH"
        items={['Dysarthria, Ataxia, Nystagmus, Intention tremor, Slurred speech, Hypotonia.', 'Útil como checklist rápido al pie de cama.']}
      />
    </div>
  )
}

function ExamTab() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="tab-panel">
      <SectionTitle number="03" title="Examen físico neurológico" subtitle="Maniobras para evaluar coordinación, tono, marcha y ocularidad." />
      <InfoBox
        title="Principio del examen"
        items={[
          'Orden práctico: postura, marcha, coordinación cinética, tono, reflejos, ocularidad y habla.',
          'Comparar derecha e izquierda: el síndrome cerebeloso hemisférico es ipsilateral.',
        ]}
      />
      <div className="exam-layout">
        <div className="exam-list">
          {exam.map((item, index) => (
            <button className={selected === index ? 'is-selected' : ''} key={item.name} type="button" onClick={() => setSelected(index)}>
              <Badge tone={item.tone}>{item.type}</Badge>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <article className={`exam-detail exam-detail--${exam[selected].tone}`}>
          <h3>{exam[selected].name}</h3>
          <dl>
            <div>
              <dt>Técnica</dt>
              <dd>{exam[selected].technique}</dd>
            </div>
            <div>
              <dt>Resultado positivo</dt>
              <dd>{exam[selected].positive}</dd>
            </div>
          </dl>
          <div className="tag-row">
            {exam[selected].targets.map((target) => (
              <Badge key={target}>{target}</Badge>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

function DifferentialTab() {
  return (
    <div className="tab-panel">
      <SectionTitle number="04" title="Diagnóstico diferencial" subtitle="Comparación de ataxia cerebelosa, sensitiva y laberíntica." />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Cerebelosa</th>
              <th>Sensitiva</th>
              <th>Laberíntica</th>
            </tr>
          </thead>
          <tbody>
            {differential.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="etiology-grid">
        {etiologies.map(([title, body]) => (
          <article className="card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <InfoBox
        tone="danger"
        title="Red flags"
        items={[
          'Instalación aguda o subaguda: descartar ACV o hematoma cerebeloso.',
          'Cefalea, vómitos y ataxia: pensar en hipertensión endocraneana o lesión de fosa posterior.',
          'Progresión con pérdida de peso: evaluar neoplasia o síndrome paraneoplásico.',
        ]}
      />
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('anatomia')

  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Neurología clínica</p>
          <h1>Síndrome cerebeloso</h1>
          <p className="hero__lead">
            Guía visual para reconocer la semiología cerebelosa, ordenar el examen neurológico y orientar la localización clínica.
          </p>
          <div className="hero__actions" aria-label="Temas principales">
            <span>
              <Stethoscope size={18} /> Exploración
            </span>
            <span>
              <Activity size={18} /> Semiología
            </span>
            <span>
              <ClipboardCheck size={18} /> Diagnóstico
            </span>
          </div>
        </div>
        <div className="hero__panel" aria-label="Resumen clínico">
          <div className="pulse">
            <Brain size={72} />
          </div>
          <dl>
            <div>
              <dt>Clave</dt>
              <dd>Coordinar precisión, postura y marcha</dd>
            </div>
            <div>
              <dt>Signos</dt>
              <dd>Dismetría, ataxia, nistagmo, disartria</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="overview" aria-label="Resumen">
        {overview.map(({ icon: Icon, title, body }) => (
          <article className="card" key={title}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <nav className="tab-nav" aria-label="Secciones de la clase">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button className={activeTab === id ? 'is-active' : ''} key={id} type="button" onClick={() => setActiveTab(id)}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {activeTab === 'anatomia' && <AnatomyTab />}
      {activeTab === 'manifestaciones' && <ManifestationsTab />}
      {activeTab === 'examen' && <ExamTab />}
      {activeTab === 'diferencial' && <DifferentialTab />}

      <section className="clinical-path">
        <div>
          <Eye size={28} />
          <h2>Mirada sistemática</h2>
          <p>
            Describir primero la marcha y el eje corporal, luego comparar miembros derecho e izquierdo. La asimetría ayuda a localizar lesiones hemisféricas.
          </p>
        </div>
        <div>
          <Footprints size={28} />
          <h2>Marcha cerebelosa</h2>
          <p>
            Base amplia, oscilación lateral, dificultad para tándem y caídas sin dirección única orientan a compromiso vermiano o vestibulocerebeloso.
          </p>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
