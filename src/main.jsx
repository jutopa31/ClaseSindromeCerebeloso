import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity,
  Brain,
  ClipboardCheck,
  Eye,
  Footprints,
  ListChecks,
  Microscope,
  Route,
  Stethoscope,
} from 'lucide-react'
import './styles.css'

const sections = [
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

const exam = [
  'Marcha y bipedestación',
  'Prueba dedo-nariz',
  'Talón-rodilla',
  'Diadococinesia',
  'Rebote y fenómeno de Stewart-Holmes',
  'Nistagmo y movimientos oculares',
  'Disartria escandida',
  'Hipotonía pendular',
]

const signs = [
  { label: 'Ataxia', detail: 'Oscilación, base amplia e inestabilidad al girar.' },
  { label: 'Dismetría', detail: 'Error en la amplitud o dirección del movimiento.' },
  { label: 'Disdiadococinesia', detail: 'Dificultad para movimientos alternantes rápidos.' },
  { label: 'Temblor intencional', detail: 'Aumenta al aproximarse al objetivo.' },
]

function App() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Neurología clínica</p>
          <h1>Síndrome cerebeloso</h1>
          <p className="hero__lead">
            Guía visual para reconocer la semiología cerebelosa, ordenar el examen neurológico y
            orientar la localización clínica.
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
        {sections.map(({ icon: Icon, title, body }) => (
          <article className="card" key={title}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="split">
        <div>
          <p className="eyebrow">Examen</p>
          <h2>Secuencia práctica</h2>
          <div className="checklist">
            {exam.map((item) => (
              <div className="check" key={item}>
                <ListChecks size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="signs">
          <p className="eyebrow">Semiología</p>
          <h2>Hallazgos esperables</h2>
          {signs.map((item) => (
            <article key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="clinical-path">
        <div>
          <Eye size={28} />
          <h2>Mirada sistemática</h2>
          <p>
            Describir primero la marcha y el eje corporal, luego comparar miembros derecho e
            izquierdo. La asimetría ayuda a localizar lesiones hemisféricas.
          </p>
        </div>
        <div>
          <Footprints size={28} />
          <h2>Marcha cerebelosa</h2>
          <p>
            Base amplia, oscilación lateral, dificultad para tándem y caídas sin dirección única
            orientan a compromiso vermiano o vestibulocerebeloso.
          </p>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
