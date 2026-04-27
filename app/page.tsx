'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, MapPin, Clock, Calendar, Heart, Send } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  可自定义内容区 — 修改以下常量即可替换婚礼信息                           */
/* ------------------------------------------------------------------ */
const GROOM = '张三'
const BRIDE = '李四'
const WEDDING_DATE_SOLAR = '2025年10月1日 星期三'
const WEDDING_DATE_LUNAR = '农历八月十九 12:00 PM'
const VENUE_NAME = 'XX大酒店 · 宴会厅'
const VENUE_ADDRESS = 'XX省XX市XX区XX路XX号'
const YEAR_MET = '2020'
const YEAR_LOVE = '2021'
const YEAR_WEDDING = '2025'

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook — 控制滚动进入视口时的渐入动画              */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ------------------------------------------------------------------ */
/*  主组件                                                              */
/* ------------------------------------------------------------------ */
export default function WeddingInvitation() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [guests, setGuests] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // 各 section 渐入控制
  const sec1 = useInView()
  const sec2 = useInView()
  const sec3 = useInView()
  const sec4 = useInView()

  useEffect(() => {
    const saved = localStorage.getItem('wedding-guests')
    if (saved) {
      try { setGuests(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }, [])

  const toggleMusic = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (musicPlaying) {
      a.pause()
    } else {
      a.play().catch(() => { /* browser autoplay policy */ })
    }
    setMusicPlaying(p => !p)
  }, [musicPlaying])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = guestName.trim()
    if (!name) return
    const updated = [...guests, name]
    setGuests(updated)
    localStorage.setItem('wedding-guests', JSON.stringify(updated))
    setSubmitted(true)
  }

  /* ==================== JSX ==================== */
  return (
    <div className="snap-container hide-scrollbar">
      {/* 背景音乐 — 将 /music/bgm.mp3 放到 public/music/ 目录下 */}
      <audio ref={audioRef} src="/music/bgm.mp3" loop preload="auto" />

      {/* -------- 右上角旋转碟片音乐按钮 -------- */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full
                   bg-black/20 backdrop-blur-md flex items-center justify-center
                   border border-white/20 shadow-lg active:scale-90 transition-transform"
        aria-label="Toggle music"
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center
                      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600
                      music-disc ${!musicPlaying ? 'music-disc-paused' : ''}`}
        >
          {/* 碟片中心 */}
          <div className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-inner" />
          {/* 碟片纹路 */}
          <div className="absolute w-6 h-6 rounded-full border border-white/10" />
        </div>
        {/* 音符提示 */}
        {musicPlaying && (
          <span className="absolute -bottom-1 -right-1 text-[10px] leading-none">🎵</span>
        )}
      </button>

      {/* ================================================================ */}
      {/*  Section 1 — 封面                                                */}
      {/* ================================================================ */}
      <section
        ref={sec1.ref}
        className="snap-section flex flex-col items-center"
        style={{
          background:
            'linear-gradient(to bottom, #6B0620 0%, #9B1B30 25%, #B8566A 50%, #E8C4C4 70%, #FFF5F0 90%, #FFF8F5 100%)',
        }}
      >
        {/* 顶部英文标题 */}
        <p
          className={`text-[10px] tracking-[0.5em] text-white/50 mt-14 uppercase font-light
                      ${sec1.visible ? 'fade-in anim-delay-1' : 'opacity-0'}`}
        >
          Wedding Invitation
        </p>

        {/* 人物照片区域 — 替换为实际 PNG 抠图照片 */}
        <div
          className={`relative w-72 h-[42vh] mt-4 mx-auto rounded-xl overflow-hidden
                      ${sec1.visible ? 'fade-in-up anim-delay-2' : 'opacity-0'}`}
        >
          {/* 默认占位 — 有真实照片后删除此 div，取消下方 <img> 注释 */}
          <div className="w-full h-full bg-gradient-to-b from-[#C4808C]/60 to-[#D4A574]/40 flex flex-col items-center justify-center">
            <Heart className="w-14 h-14 text-white/70 heartbeat" />
            <p className="text-white/60 text-sm mt-3 tracking-wider">{GROOM} & {BRIDE}</p>
            <p className="text-white/40 text-[10px] mt-1">替换为婚纱照</p>
          </div>
          {/*
            <img
              src="/images/couple-cover.png"
              alt="新郎新娘"
              className="w-full h-full object-cover object-top"
            />
          */}
        </div>

        {/* 文案 */}
        <div className="text-center mt-6 px-8 space-y-2.5">
          <p className={`text-lg text-wedding-text tracking-widest leading-relaxed
                         ${sec1.visible ? 'fade-in-up anim-delay-3' : 'opacity-0'}`}>
            蓄谋已久，如我所愿
          </p>
          <p className={`text-lg text-wedding-text tracking-widest leading-relaxed
                         ${sec1.visible ? 'fade-in-up anim-delay-4' : 'opacity-0'}`}>
            四季有你，胜却人间无数
          </p>
          <p className={`text-xl text-wedding-primary/50 ${sec1.visible ? 'fade-in anim-delay-4' : 'opacity-0'}`}>
            /
          </p>
          <p className={`text-[15px] text-wedding-text/75 tracking-wider leading-relaxed
                         ${sec1.visible ? 'fade-in-up anim-delay-5' : 'opacity-0'}`}>
            终于将故事写成了我们
          </p>
          <p className={`text-[15px] text-wedding-text/75 tracking-wider leading-relaxed
                         ${sec1.visible ? 'fade-in-up anim-delay-6' : 'opacity-0'}`}>
            诚邀生命中不同阶段重要的你们
          </p>
          <p className={`text-[15px] text-wedding-text/75 tracking-wider leading-relaxed
                         ${sec1.visible ? 'fade-in-up anim-delay-7' : 'opacity-0'}`}>
            参加这场以结婚为名的聚会
          </p>
        </div>

        {/* 囍 */}
        <div className={`mt-5 text-4xl text-wedding-light font-serif xi-glow select-none
                         ${sec1.visible ? 'fade-in-up anim-delay-8' : 'opacity-0'}`}>
          囍
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-6 left-1/2 scroll-hint">
          <ChevronDown className="w-5 h-5 text-wedding-primary/30" />
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Section 2 — 爱情故事                                            */}
      {/* ================================================================ */}
      <section
        ref={sec2.ref}
        className="snap-section flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #FFF8F5 0%, #FFF0EB 40%, #FFEAE3 100%)',
        }}
      >
        {/* 分割线 */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-wedding-light/20 to-transparent" />

        <div className="text-center px-8 max-w-sm mx-auto">
          {/* 小标题 */}
          <div className={`mb-8 ${sec2.visible ? 'fade-in-up anim-delay-1' : 'opacity-0'}`}>
            <p className="text-[10px] tracking-[0.4em] text-wedding-primary/45 uppercase mb-3">
              Our Love Story
            </p>
            <div className="separator-line mx-auto" />
          </div>

          {/* 新人姓名 */}
          <div className={`flex items-center justify-center gap-4 mb-10
                           ${sec2.visible ? 'fade-in-up anim-delay-2' : 'opacity-0'}`}>
            <span className="text-2xl text-wedding-text font-serif tracking-wider">{GROOM}</span>
            <Heart className="w-5 h-5 text-wedding-light heartbeat" fill="#C41E3A" />
            <span className="text-2xl text-wedding-text font-serif tracking-wider">{BRIDE}</span>
          </div>

          {/* 情诗 */}
          <div className="space-y-5">
            <p className={`text-base text-wedding-text/70 tracking-wider leading-loose
                           ${sec2.visible ? 'fade-in-up anim-delay-3' : 'opacity-0'}`}>
              遇见你之前，我没想过结婚
            </p>
            <p className={`text-base text-wedding-text/70 tracking-wider leading-loose
                           ${sec2.visible ? 'fade-in-up anim-delay-4' : 'opacity-0'}`}>
              遇见你之后，我没想过别人
            </p>

            <div className={`flex items-center justify-center gap-3 py-1
                             ${sec2.visible ? 'fade-in anim-delay-4' : 'opacity-0'}`}>
              <div className="w-8 h-px bg-wedding-light/20" />
              <span className="text-wedding-light/35 text-base">♥</span>
              <div className="w-8 h-px bg-wedding-light/20" />
            </div>

            <p className={`text-sm text-wedding-text/45 leading-relaxed
                           ${sec2.visible ? 'fade-in-up anim-delay-5' : 'opacity-0'}`}>
              从相识到相知，从相恋到相守<br />
              我们携手走过每一个春夏秋冬<br />
              如今，终于要在亲友的见证下<br />
              许下一生的承诺
            </p>
          </div>

          {/* 时间轴 */}
          <div className={`mt-10 flex items-center justify-center gap-6
                           ${sec2.visible ? 'fade-in-up anim-delay-6' : 'opacity-0'}`}>
            <TimelineNode label="相识" year={YEAR_MET} />
            <div className="w-12 h-px bg-gradient-to-r from-wedding-light/10 via-wedding-light/25 to-wedding-light/10" />
            <TimelineNode label="相恋" year={YEAR_LOVE} />
            <div className="w-12 h-px bg-gradient-to-r from-wedding-light/10 via-wedding-light/25 to-wedding-light/10" />
            <TimelineNode label="结婚" year={YEAR_WEDDING} highlight />
          </div>

          {/* 囍 */}
          <div className={`mt-10 text-3xl text-wedding-light/15 font-serif select-none
                           ${sec2.visible ? 'fade-in anim-delay-7' : 'opacity-0'}`}>
            囍
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 scroll-hint">
          <ChevronDown className="w-5 h-5 text-wedding-primary/25" />
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Section 3 — 婚礼详情（时间 + 地点）                              */}
      {/* ================================================================ */}
      <section
        ref={sec3.ref}
        className="snap-section flex flex-col items-center"
        style={{
          background: 'linear-gradient(to bottom, #6B0620 0%, #9B1B30 35%, #8B1528 100%)',
        }}
      >
        {/* 照片区域 — 上半部分 */}
        <div className="relative w-full photo-blend-bottom" style={{ height: '44vh', ['--blend-color' as string]: '#9B1B30' }}>
          {/* 占位 */}
          <div className="w-full h-full bg-gradient-to-br from-[#B8566A]/50 to-[#D4A574]/30 flex flex-col items-center justify-center">
            <Heart className="w-10 h-10 text-white/60" />
            <p className="text-white/50 text-xs mt-2">婚纱照 / 婚礼现场照</p>
          </div>
          {/*
            <img
              src="/images/couple-detail.jpg"
              alt="婚纱照"
              className="w-full h-full object-cover object-top"
            />
          */}
        </div>

        {/* 圆形地图 */}
        <div className={`map-circle w-32 h-32 -mt-16 z-10 relative
                         ${sec3.visible ? 'fade-in-up anim-delay-2' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-br from-sky-100 to-sky-200 flex flex-col items-center justify-center">
            <MapPin className="w-5 h-5 text-wedding-light mb-1" />
            <p className="text-[10px] text-gray-500">点击查看地图</p>
          </div>
          {/* 替换为实际地图截图或嵌入 iframe */}
        </div>

        {/* 日期 & 地点 */}
        <div className="text-center mt-5 px-8 text-white">
          <div className={`flex items-center justify-center gap-2 mb-2
                           ${sec3.visible ? 'fade-in-up anim-delay-3' : 'opacity-0'}`}>
            <Calendar className="w-4 h-4 text-white/50" />
            <p className="text-lg tracking-wider">{WEDDING_DATE_SOLAR}</p>
          </div>
          <div className={`flex items-center justify-center gap-2 mb-6
                           ${sec3.visible ? 'fade-in-up anim-delay-4' : 'opacity-0'}`}>
            <Clock className="w-4 h-4 text-white/50" />
            <p className="text-[15px] text-white/75">{WEDDING_DATE_LUNAR}</p>
          </div>

          <div className="w-10 h-px bg-white/15 mx-auto mb-6" />

          <div className={`flex items-center justify-center gap-2 mb-2
                           ${sec3.visible ? 'fade-in-up anim-delay-5' : 'opacity-0'}`}>
            <MapPin className="w-4 h-4 text-white/50" />
            <p className="text-lg tracking-wider">{VENUE_NAME}</p>
          </div>
          <p className={`text-sm text-white/45 ${sec3.visible ? 'fade-in-up anim-delay-6' : 'opacity-0'}`}>
            {VENUE_ADDRESS}
          </p>
        </div>

        {/* 囍 */}
        <div className={`mt-8 text-3xl text-white/8 font-serif select-none
                         ${sec3.visible ? 'fade-in anim-delay-7' : 'opacity-0'}`}>
          囍
        </div>

        <div className="absolute bottom-6 left-1/2 scroll-hint">
          <ChevronDown className="w-5 h-5 text-white/25" />
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Section 4 — 宾客签到                                            */}
      {/* ================================================================ */}
      <section
        ref={sec4.ref}
        className="snap-section flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #FFF8F5 0%, #FFF0EB 50%, #FFEAE3 100%)',
        }}
      >
        <div className="text-center px-8 max-w-sm mx-auto w-full">
          {/* 小标题 */}
          <div className={`mb-6 ${sec4.visible ? 'fade-in-up anim-delay-1' : 'opacity-0'}`}>
            <p className="text-[10px] tracking-[0.4em] text-wedding-primary/45 uppercase mb-3">
              RSVP
            </p>
            <h2 className="text-2xl text-wedding-text tracking-widest mb-3 font-serif">诚邀出席</h2>
            <div className="separator-line mx-auto" />
          </div>

          <p className={`text-sm text-wedding-text/55 mb-8 leading-relaxed
                         ${sec4.visible ? 'fade-in-up anim-delay-2' : 'opacity-0'}`}>
            您的到来是我们最大的荣幸<br />
            请留下您的姓名，作为受邀记录
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className={`space-y-8 ${sec4.visible ? 'fade-in-up anim-delay-3' : 'opacity-0'}`}
            >
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="请输入您的姓名"
                className="wedding-input"
                required
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3
                             bg-gradient-to-r from-wedding-primary to-wedding-light
                             text-white rounded-full text-sm tracking-wider
                             shadow-md hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  确认出席
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 fade-in-up">
              <div className="w-16 h-16 rounded-full bg-wedding-light/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-wedding-light" fill="#C41E3A" />
              </div>
              <p className="text-lg text-wedding-text tracking-wider">
                感谢您，{guests[guests.length - 1]}
              </p>
              <p className="text-sm text-wedding-text/45 leading-relaxed">
                我们已收到您的确认<br />期待与您相见
              </p>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setGuestName('') }}
                className="mt-4 text-xs text-wedding-primary/35 underline underline-offset-2"
              >
                重新填写
              </button>
            </div>
          )}

          {/* 已签到列表 */}
          {guests.length > 0 && (
            <div className={`mt-10 pt-5 border-t border-wedding-light/10
                             ${sec4.visible ? 'fade-in anim-delay-5' : 'opacity-0'}`}>
              <p className="text-[10px] text-wedding-primary/35 mb-3 tracking-wider">
                已确认出席（{guests.length}）
              </p>
              <div className="flex flex-wrap justify-center">
                {guests.slice(-12).map((n, i) => (
                  <span key={i} className="guest-tag">{n}</span>
                ))}
              </div>
            </div>
          )}

          {/* 页脚 */}
          <div className={`mt-10 ${sec4.visible ? 'fade-in anim-delay-6' : 'opacity-0'}`}>
            <div className="text-4xl text-wedding-light/12 font-serif xi-glow select-none">
              囍
            </div>
            <p className="text-[10px] text-wedding-text/25 mt-4 tracking-widest">
              {GROOM} & {BRIDE} · {YEAR_WEDDING}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  小组件：时间轴节点                                                   */
/* ------------------------------------------------------------------ */
function TimelineNode({
  label,
  year,
  highlight = false,
}: {
  label: string
  year: string
  highlight?: boolean
}) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-wedding-primary/40">{label}</p>
      <p
        className={`text-sm mt-1 ${
          highlight ? 'text-wedding-light font-medium' : 'text-wedding-text/55'
        }`}
      >
        {year}
      </p>
    </div>
  )
}
