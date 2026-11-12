import styles from "./studio-manual.module.css"
import StudioNav from "./StudioNav"

export default function StudioManualPage() {
  return (
    <div className={styles.shell}>
      <StudioNav />

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
              <span className={styles.pill}>Version 0.2</span>
              <span className={styles.pill}>November 2026</span>
              <span className={styles.pill}>44.1 kHz / 24-bit</span>
              <span className={styles.pill}>Ableton Live 12 (Live 13 upgrade included)</span>
              <span className={styles.pill}>
                Last update: Added true peak policy, streaming specs, free plugin kit, and
                mastering checks from the BADGER album.
              </span>
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
                <div className={styles.small}>
                  Healthy target before mastering. Not a magic number (workflow habit, see
                  Gain Staging).
                </div>
              </div>
              <div className={`${styles.card} ${styles.third}`}>
                <div className={styles.label}>Limiter</div>
                <div className={styles.value}>-1.0 dBTP</div>
                <div className={styles.small}>
                  Ableton Limiter (Live 12.1+), True Peak mode, lookahead 6 ms.
                </div>
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
              <div className={`${styles.card} ${styles.full}`}>
                <div className={styles.label}>True peak</div>
                <p>
                  How high the actual waveform goes when a converter or MP3/AAC encoder
                  rebuilds it from the samples. It can exceed the highest sample value.
                  Fast, bright transients (pick attacks, muted string snaps) cause it.
                </p>
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
              <span className={styles.node}>Ableton Live 12</span>
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
              <li>
                Mic distance controls low-mid buildup. Directional mics boost low end up
                close (proximity effect). On the Red Moon Apostles record, close-miked
                guitar, vocal, bass, and Rhodes piled up in the low mids. Backing the mics
                off fixed it at the source.
              </li>
            </ul>

            <h3>Levels</h3>
            <p>
              Recording levels are a real ceiling. Preamp and converter clipping is
              permanent, so keep comfortable peak margin.
            </p>
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

            <div className={styles.callout}>
              <strong>
                Ableton mixes in floating point, so tracks and buses can’t clip internally.
              </strong>
              <br />
              Only the master output and exported files can. The -6 dBFS pre-master peak is
              a workflow convention that keeps sessions sane, not a technical requirement.
              Final loudness comes from the limiter input. Don’t sacrifice balance to stay
              under -6. A source can go over in a section if it sounds better.
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
              <span className={styles.node}>
                Ableton Limiter (True Peak, -1.0 dBTP, 6 ms lookahead, Auto)
              </span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}>Youlean Loudness Meter</span>
            </div>

            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.label}>Limiter baseline</div>
                <table>
                  <tbody>
                    <tr>
                      <th>Parameter</th>
                      <th>Starting value</th>
                    </tr>
                    <tr>
                      <td>Plugin</td>
                      <td><strong>Ableton Limiter</strong> (Live 12.1+)</td>
                    </tr>
                    <tr>
                      <td>Mode</td>
                      <td><strong>True Peak</strong></td>
                    </tr>
                    <tr>
                      <td>Output / Ceiling</td>
                      <td><strong>-1.0 dBTP</strong></td>
                    </tr>
                    <tr>
                      <td>Lookahead</td>
                      <td><strong>6 ms</strong></td>
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
                <p className={styles.small}>
                  Use one limiter. If a non-true-peak limiter is ever used, its ceiling is
                  sample peak (dBFS), not dBTP. Set it lower and verify true peak in
                  Youlean.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.label}>Youlean checks</div>
                <ul>
                  <li>Integrated LUFS</li>
                  <li>Short-Term LUFS</li>
                  <li>True Peak</li>
                  <li>Loudness Range</li>
                </ul>
                <p className={styles.small}>
                  Switch the preset off DEFAULT (that targets -23 LUFS broadcast) to a
                  streaming preset. Reset and measure full-song passes for integrated LUFS.
                </p>
              </div>
            </div>

            <h3>Loudness Philosophy</h3>
            <ul>
              <li>Mix by ear first.</li>
              <li>Use the limiter to raise final level, not to solve balance problems.</li>
              <li>Use Youlean to verify the result.</li>
              <li>Do not select a target LUFS number without considering genre, arrangement, density, and reference masters.</li>
              <li>Compare perceived loudness at matched playback level.</li>
              <li>
                Judge album consistency by each song’s loudest sections (short-term LUFS of
                the loudest passages), not integrated LUFS. Dynamic songs measure quieter
                overall even when their loud moments match.
              </li>
              <li>
                BADGER example: integrated spread -12.6 to -15.8 LUFS, but the loudest
                sections of tracks 1–6 landed within 0.5 dB of each other. A gentle slope
                from a punchy opener to a dynamic closer is fine.
              </li>
            </ul>

            <h3>Dither</h3>
            <p>
              None on 24-bit masters. Any 16-bit export: triangular dither, rendered as its
              own export from the session, dithered once at the final step. Never convert an
              already-dithered file.
            </p>

            <h3>Reference Tracks</h3>
            <ul>
              <li>Route references so they bypass the mastering chain.</li>
              <li>Level-match before comparing tonal balance or punch.</li>
              <li>Use several references rather than copying one master.</li>
              <li>Check low end, vocal position, transient impact, stereo width, and overall density.</li>
            </ul>
          </section>

          <section id="streaming-specs">
            <h2>Streaming Specs</h2>
            <p className={styles.lead}>Spotify, verified November 2026.</p>
            <ul>
              <li>Spotify normalizes playback to -14 LUFS integrated (ITU-R BS.1770).</li>
              <li>
                Louder masters are turned down. Softer masters are turned up only as far as
                their true peak allows, leaving 1 dB of headroom for lossy encoding.
              </li>
              <li>
                Keep true peak below -1 dBTP. If a master is louder than -14 LUFS, Spotify
                recommends true peak below -2 dBTP.
              </li>
              <li>
                In album playback, Spotify normalizes the whole album at once, so relative
                levels between songs are preserved.
              </li>
              <li>
                Premium listeners can choose Quiet (-19 LUFS), Normal (-14), or Loud (-11).
              </li>
              <li>Being louder than -14 LUFS gains nothing on Spotify.</li>
            </ul>
            <p className={styles.small}>
              Source:{" "}
              <a
                href="https://support.spotify.com/artists/article/loudness-normalization/"
                target="_blank"
                rel="noopener noreferrer"
              >
                support.spotify.com/artists/article/loudness-normalization
              </a>
            </p>

            <div className={styles.callout}>
              <strong>Re-check these specs before each release.</strong>
              <br />
              They change.
            </div>
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
                  <li>24-bit WAV for streaming, no dither</li>
                  <li>Plus an MP3 reference copy</li>
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
              <div className={`${styles.card} ${styles.full}`}>
                <div className={styles.label}>Folders</div>
                <p>Keep each format in its own clearly labeled folder.</p>
              </div>
            </div>
          </section>

          <section id="plugin-notes">
            <h2>Plugin Notes</h2>

            <details open>
              <summary>Ableton Limiter (Live 12.1+)</summary>
              <p><strong>Purpose:</strong> final loudness and peak control.</p>
              <p><strong>Baseline:</strong> True Peak mode, Soft Clip, Mid/Side, 6 ms lookahead, -1.0 dBTP ceiling, Auto release, approximately 2–4 dB maximum gain reduction on loudest passages.</p>
              <p><strong>Do not use for:</strong> fixing gain staging, flattening an unstable mix, or replacing automation.</p>
            </details>

            <details>
              <summary>Precision Limiter (UAD)</summary>
              <p><strong>Status:</strong> retired from the master bus.</p>
              <p>
                Sounds good, but it limits sample peaks only and can’t catch inter-sample
                (true) peaks. On BADGER, Swan Song held -1.0 dBFS but reached +0.4 dBTP.
              </p>
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

            <h3>Free Plugin Kit</h3>
            <ul>
              <li><strong>TDR Nova:</strong> dynamic EQ for intermittent problems.</li>
              <li>
                <strong>TDR Kotelnikov:</strong> transparent, mastering-grade bus
                compressor. Easy to overdo, keep it subtle.
              </li>
              <li>
                <strong>TDR SlickEQ:</strong> musical console-style EQ for broad tone moves.
              </li>
              <li>
                <strong>Voxengo SPAN:</strong> spectrum analyzer and correlation meter for
                spotting low-mid buildup and comparing to references. No LUFS, keep Youlean
                for loudness.
              </li>
              <li><strong>Klanghelm DC1A:</strong> simple one-knob character compressor.</li>
              <li>
                <strong>Valhalla Supermassive:</strong> lush ambient reverb and delay. A
                flavor tool, not a workhorse.
              </li>
              <li>
                <strong>Youlean Loudness Meter:</strong> loudness and true peak verification.
              </li>
            </ul>

            <h3>Paid upgrade path (only if justified)</h3>
            <p>
              FabFilter Pro-L 2 ($199, often on sale). Industry-standard true-peak limiter
              with built-in loudness metering. Buy only if it wins a level-matched blind
              comparison against Ableton’s Limiter on real material.
            </p>
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
                  <li>Youlean true peak max at or below -1.0 dBTP over a full pass</li>
                  <li>
                    Re-measure every re-bounce. A leftover setting can sneak in (BADGER:
                    Open re-bounced with a -2.5 ceiling left on).
                  </li>
                  <li>
                    Songs mixed in a separate session: match the master chain settings to
                    the main session (BADGER: Devils and Bones came out 1.5 dB low)
                  </li>
                  <li>
                    Endings fade naturally, no cut-offs. Head and tail silence is
                    intentional.
                  </li>
                  <li>Exports landed in the right folders with the right names</li>
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
              <li>
                Whether every track shares one mastering chain or requires song-specific
                variations. <strong>Resolved:</strong> one shared mastering chain.
                Song-specific changes only to limiter input level.
              </li>
              <li>
                Final dither policy for any 16-bit derivative exports.{" "}
                <strong>Resolved:</strong> see the dither line in Mastering.
              </li>
              <li>
                Level-matched blind test of Ableton Limiter vs Pro-L 2 trial on the next
                record.
              </li>
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
