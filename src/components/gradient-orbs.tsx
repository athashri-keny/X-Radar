'use client'

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep purple orb — top-left */}
      <div
        className="absolute rounded-full filter float-animation"
        style={{
          width: '700px',
          height: '700px',
          top: '-15%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(88, 28, 135, 0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Blue orb — right side */}
      <div
        className="absolute rounded-full float-reverse-animation"
        style={{
          width: '600px',
          height: '600px',
          top: '20%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.28) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s',
        }}
      />

      {/* Indigo orb — bottom-center */}
      <div
        className="absolute rounded-full glow-animation"
        style={{
          width: '500px',
          height: '500px',
          bottom: '-10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(67, 56, 202, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '4s',
        }}
      />
    </div>
  )
}
