import styles from "./studio-manual.module.css"

const navItems: { href: string; label: string }[] = [
  { href: "#quick-reference", label: "Quick Reference" },
  { href: "#session-setup", label: "Session Setup" },
  { href: "#recording", label: "Recording" },
  { href: "#gain-staging", label: "Gain Staging" },
  { href: "#mixing", label: "Mixing" },
  { href: "#space", label: "Space" },
  { href: "#mastering", label: "Mastering" },
  { href: "#export", label: "Export" },
  { href: "#plugin-notes", label: "Plugin Notes" },
  { href: "#checklists", label: "Checklists" },
  { href: "#open-questions", label: "Open Questions" },
]

export default function StudioManualPage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          Michael Charles Brown<strong>Studio Manual</strong>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Personal working document · Phase 1</div>
            <h1>Studio Manual</h1>
            <p className={styles.dek}>
              A practical reference for recording, mixing, mastering, and delivery.
              Built to preserve exact settings, repeatable workflows, and decisions
              that should not have to be rediscovered on the next record.
            </p>
            <div className={styles.meta}>
              <span className={styles.pill}>Version 0.1</span>
              <span className={styles.pill}>July 2026</span>
              <span className={styles.pill}>44.1 kHz / 24-bit</span>
              <span className={styles.pill}>Ableton Live 11</span>
              <span className={styles.pill}>Last update: Switched album standard to 44.1 kHz</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <section id="quick-reference">
            <h2>Quick Reference</h2>
            <p className={styles.lead}>The numbers and decisions most likely to be forgotten.</p>
            <div className={styles.grid}>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Pre-master peak</div>
                <div className={styles.value}>≈ -6 dBFS</div>
                <div className={styles.small}>Healthy target before mastering. Not a magic number.</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Limiter ceiling</div>
                <div className={styles.value}>-1.0 dBTP</div>
                <div className={styles.small}>Use true-peak output protection.</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Limiter release</div>
                <div className={styles.value}>Auto</div>
                <div className={styles.small}>Starting point unless the material clearly asks otherwise.</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Gain reduction</div>
                <div className={styles.value}>2–4 dB</div>
                <div className={styles.small}>At the loudest passages, not continuously.</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Session format</div>
                <div className={styles.value}>44.1 kHz / 24-bit</div>
                <div className={styles.small}>Album production standard.</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Metering</div>
                <div className={styles.value}>Youlean</div>
                <div className={styles.small}>Integrated LUFS, short-term LUFS, true peak, loudness range.</div>
              </div>
            </div>

            <div className={styles.callout}>
              <strong>Headroom creates clarity. The limiter creates loudness.</strong>
              <br />
              These are separate jobs.
            </div>
          </section>

          <section id="session-setup">
            <h2>Session Setup</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Routing</div>
                <div className={styles.chain}>
                  <span className={styles.node}>Tracks</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.node}>Instrument Groups</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.node}>Pre-Master</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.node}>Master</span>
                </div>
                <p className={styles.small}>
                  Mastering processing should sit after the Pre-Master. Lower the
                  complete mix before the mastering chain when more headroom is required.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.label}>Organization</div>
                <ul>
                  <li>Use consistent track names.</li>
                  <li>Color-code by instrument family.</li>
                  <li>Group drums, bass, guitars, keys, vocals, and FX.</li>
                  <li>Use VST3 versions where possible.</li>
                  <li>Keep reference tracks outside the mastering path.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="recording">
            <h2>Recording</h2>
            <p className={styles.lead}>Capture a sound that already belongs on the record.</p>

            <h3>Primary Signal Path</h3>
            <div className={styles.chain}>
              <span className={styles.node}>Microphone</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>LA-610 MkII</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Apollo</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Ableton Live 11</span>
            </div>

            <h3>Core Hardware</h3>
            <table>
              <tbody>
                <tr>
                  <th>Category</th>
                  <th>Current equipment</th>
                </tr>
                <tr>
                  <td>Interfaces</td>
                  <td>UA Apollo x8p + Apollo Twin Duo via ADAT</td>
                </tr>
                <tr>
                  <td>Monitoring</td>
                  <td>Focal Alpha Twin Evo + Sub One</td>
                </tr>
                <tr>
                  <td>Microphones</td>
                  <td>Neumann KM184 pair, TLM-102, Royer R-10, Sphere L22, SM57s</td>
                </tr>
                <tr>
                  <td>Outboard</td>
                  <td>Universal Audio LA-610 MkII</td>
                </tr>
                <tr>
                  <td>Instruments</td>
                  <td>Yamaha upright, Moog Mother-32, Korg MS-20, OP-1 Field, Tascam 388</td>
                </tr>
              </tbody>
            </table>

            <h3>Recorded Instrument Principle</h3>
            <ul>
              <li>Commit to tone early when the sound is clearly working.</li>
              <li>Do not print processing merely because it is available.</li>
              <li>Fix mic placement, performance, noise, and room problems before reaching for corrective plugins.</li>
              <li>Preserve enough transient and dynamic information for the mix.</li>
            </ul>
          </section>

          <section id="gain-staging">
            <h2>Gain Staging</h2>
            <p className={styles.lead}>
              Gain staging exists to preserve headroom and make decisions easier—not to
              chase an arbitrary meter reading.
            </p>

            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>During recording</div>
                <ul>
                  <li>Record healthy, unclipped levels.</li>
                  <li>Leave comfortable peak margin.</li>
                  <li>Do not normalize everything by default.</li>
                </ul>
              </div>
              <div className={styles.card}>
                <div className={styles.label}>During mixing</div>
                <ul>
                  <li>Build the balance naturally.</li>
                  <li>Use clip gain or utility gain when a source arrives too hot.</li>
                  <li>Do not use the limiter to create mix-bus headroom.</li>
                </ul>
              </div>
              <div className={`${styles.card} ${styles.full}`}>
                <div className={styles.label}>Before mastering</div>
                <p>
                  When the mix is complete, lower the entire mix upstream of the mastering
                  chain until the Pre-Master peaks at roughly <strong>-6 dBFS</strong>. The
                  exact value can vary; the requirement is clean, comfortable headroom.
                </p>
              </div>
            </div>

            <div className={`${styles.callout} ${styles.warning}`}>
              <strong>Do not pull individual faders down after the mix is balanced.</strong>
              <br />
              Lower the complete mix at one point before mastering so the internal balance
              remains unchanged.
            </div>
          </section>

          <section id="mixing">
            <h2>Mixing</h2>
            <p className={styles.lead}>The mix should already feel like the record before the limiter is engaged.</p>

            <h3>Working Order</h3>
            <ol>
              <li>Editing and cleanup</li>
              <li>Static balance</li>
              <li>Panning</li>
              <li>Automation</li>
              <li>Corrective EQ</li>
              <li>Compression where needed</li>
              <li>Shared space and depth</li>
              <li>Reference comparison</li>
              <li>Pre-master gain check</li>
            </ol>

            <h3>EQ</h3>
            <ul>
              <li>Use EQ to remove distractions or make space.</li>
              <li>High-pass only where the removed information is not useful.</li>
              <li>Use TDR Nova when a frequency is intermittently problematic.</li>
              <li>Avoid static cuts when the problem only appears on certain notes or phrases.</li>
            </ul>

            <h3>Compression</h3>
            <ul>
              <li>Use compression to control movement, consistency, or envelope.</li>
              <li>Do not compress automatically because an instrument “should” be compressed.</li>
              <li>Listen for groove and emotional effect before watching gain reduction.</li>
            </ul>

            <h3>Automation</h3>
            <ul>
              <li>Prefer automation when the musical issue changes over time.</li>
              <li>Ride vocals, bass, reverbs, and transitions instead of over-compressing.</li>
              <li>Resolve arrangement-level energy problems before adding mastering loudness.</li>
            </ul>
          </section>

          <section id="space">
            <h2>Space</h2>
            <p className={styles.lead}>Think in acoustic environments, not isolated effects.</p>
            <div className={styles.grid}>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Return A</div>
                <div className={styles.value}>Small Room</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Return B</div>
                <div className={styles.value}>Plate</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Return C</div>
                <div className={styles.value}>Ambient</div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Return D</div>
                <div className={styles.value}>Slapback</div>
              </div>
            </div>
            <ul>
              <li>Use a small number of shared returns to make the arrangement feel coherent.</li>
              <li>Use predelay, filtering, and send level to place instruments at different depths.</li>
              <li>Insert reverbs are exceptions, not the default.</li>
            </ul>
          </section>

          <section id="mastering">
            <h2>Mastering</h2>
            <p className={styles.lead}>Mastering enhances a completed mix. It does not rescue one.</p>

            <h3>Current Chain</h3>
            <div className={styles.chain}>
              <span className={styles.node}>ATR-102 (optional)</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Gentle EQ (if needed)</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Precision Limiter</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Youlean Loudness Meter</span>
            </div>

            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Precision Limiter baseline</div>
                <table>
                  <tbody>
                    <tr>
                      <th>Parameter</th>
                      <th>Starting value</th>
                    </tr>
                    <tr>
                      <td>Output / Ceiling</td>
                      <td><strong>-1.0 dBTP</strong></td>
                    </tr>
                    <tr>
                      <td>Release</td>
                      <td><strong>Auto</strong></td>
                    </tr>
                    <tr>
                      <td>Gain reduction</td>
                      <td><strong>2–4 dB</strong> on loudest passages</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.card}>
                <div className={styles.label}>Youlean checks</div>
                <ul>
                  <li>Integrated LUFS</li>
                  <li>Short-Term LUFS</li>
                  <li>True Peak</li>
                  <li>Loudness Range</li>
                </ul>
              </div>
            </div>

            <h3>Loudness Philosophy</h3>
            <ul>
              <li>Mix by ear first.</li>
              <li>Use the limiter to raise final level, not to solve balance problems.</li>
              <li>Use Youlean to verify the result.</li>
              <li>Do not select a target LUFS number without considering genre, arrangement, density, and reference masters.</li>
              <li>Compare perceived loudness at matched playback level.</li>
            </ul>

            <h3>Reference Tracks</h3>
            <ul>
              <li>Route references so they bypass the mastering chain.</li>
              <li>Level-match before comparing tonal balance or punch.</li>
              <li>Use several references rather than copying one master.</li>
              <li>Check low end, vocal position, transient impact, stereo width, and overall density.</li>
            </ul>
          </section>

          <section id="export">
            <h2>Export & Delivery</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Album masters</div>
                <ul>
                  <li>WAV</li>
                  <li>44.1 kHz</li>
                  <li>24-bit</li>
                  <li>Consistent file naming</li>
                  <li>No accidental normalization</li>
                </ul>
              </div>
              <div className={styles.card}>
                <div className={styles.label}>Film-score delivery</div>
                <ul>
                  <li>Stereo WAV per cue</li>
                  <li>44.1 kHz / 24-bit</li>
                  <li>Approximately 2 seconds pre-roll and post-roll</li>
                  <li>Consistent start times where required</li>
                  <li>Possible stems: strings, bass/low, drones, lead/solo, FX</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="plugin-notes">
            <h2>Plugin Notes</h2>

            <details open>
              <summary>Precision Limiter</summary>
              <p><strong>Purpose:</strong> final loudness and peak control.</p>
              <p><strong>Baseline:</strong> -1.0 dBTP ceiling, Auto release, approximately 2–4 dB maximum gain reduction on loudest passages.</p>
              <p><strong>Do not use for:</strong> fixing gain staging, flattening an unstable mix, or replacing automation.</p>
            </details>

            <details>
              <summary>Youlean Loudness Meter</summary>
              <p><strong>Purpose:</strong> post-limiter verification of loudness and true peak.</p>
              <p><strong>Watch:</strong> Integrated LUFS, Short-Term LUFS, True Peak, Loudness Range.</p>
            </details>

            <details>
              <summary>TDR Nova</summary>
              <p><strong>Purpose:</strong> dynamic frequency correction.</p>
              <p><strong>Best use:</strong> resonances, harshness, or buildup that appears only at specific moments.</p>
            </details>

            <details>
              <summary>ATR-102</summary>
              <p><strong>Purpose:</strong> subtle tape character and cohesion.</p>
              <p><strong>Status:</strong> optional. Remove it if it does not clearly improve the master.</p>
            </details>
          </section>

          <section id="checklists">
            <h2>Checklists</h2>

            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Before mastering</div>
                <ul className={styles.checklist}>
                  <li>Editing and crossfades complete</li>
                  <li>No clipping anywhere in the mix path</li>
                  <li>Static balance feels finished</li>
                  <li>Automation complete</li>
                  <li>Low end translates</li>
                  <li>References checked at matched level</li>
                  <li>Pre-Master peaks around -6 dBFS</li>
                </ul>
              </div>

              <div className={styles.card}>
                <div className={styles.label}>Master approval</div>
                <ul className={styles.checklist}>
                  <li>Limiter ceiling is -1.0 dBTP</li>
                  <li>Gain reduction remains musically acceptable</li>
                  <li>Youlean measurements captured</li>
                  <li>No audible pumping or transient collapse</li>
                  <li>Checked quietly and loudly</li>
                  <li>Checked on headphones</li>
                  <li>Checked in the car</li>
                  <li>Final WAV archived</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="open-questions">
            <h2>Open Questions</h2>
            <p className={styles.lead}>
              Items to verify through actual work on the current album rather than turning
              into premature rules.
            </p>
            <ul>
              <li>Final integrated LUFS range that best suits the Red Moon Apostles record.</li>
              <li>Whether ATR-102 remains part of the final album chain.</li>
              <li>Final reference-track list.</li>
              <li>Exact album-wide low-end standard.</li>
              <li>Whether every track shares one mastering chain or requires song-specific variations.</li>
              <li>Final dither policy for any 16-bit derivative exports.</li>
            </ul>
          </section>

          <footer className={styles.footer}>
            This is a working document. Technical decisions should be updated only after
            they are tested in context and proven useful.
          </footer>
        </div>
      </main>
    </div>
  )
}
