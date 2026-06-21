import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: options.y ?? 28 });
    const anim = gsap.to(el, {
      opacity: 1, y: 0,
      duration: options.duration ?? 0.7,
      ease: options.ease ?? 'power2.out',
      delay: options.delay ?? 0,
      scrollTrigger: { trigger: el, start: options.start ?? 'top 88%', once: true },
    });
    return () => { anim.kill(); };
  }, []);
  return ref;
}

export function useStagger(staggerDelay = 0.1, options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children);
    gsap.set(children, { opacity: 0, y: 24 });
    const anim = gsap.to(children, {
      opacity: 1, y: 0, stagger: staggerDelay,
      duration: options.duration ?? 0.6,
      ease: options.ease ?? 'power2.out',
      delay: options.delay ?? 0,
      scrollTrigger: { trigger: el, start: options.start ?? 'top 85%', once: true },
    });
    return () => { anim.kill(); };
  }, []);
  return ref;
}

export function useEntrance(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: options.fromY ?? 20 },
      { opacity: 1, y: 0, duration: options.duration ?? 0.6, ease: options.ease ?? 'power2.out', delay: options.delay ?? 0 }
    );
  }, []);
  return ref;
}

export function useMagnetic(strength = 0.25) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX-(r.left+r.width/2))*strength, y: (e.clientY-(r.top+r.height/2))*strength, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return ref;
}
