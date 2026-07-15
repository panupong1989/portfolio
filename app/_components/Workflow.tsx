'use client';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { CSSProperties, useRef } from 'react';
import {
    Handshake,
    UserCheck,
    Rocket,
    Terminal,
    RotateCcw,
    ChevronUp,
    type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Step {
    n: number;
    title: string;
    desc: string;
    role: string;
    logo?: string;
    icon?: LucideIcon;
    badge?: LucideIcon;
    highlight?: boolean;
}

const STEPS: Step[] = [
    {
        n: 1,
        title: 'Requirement',
        desc: 'Understand the goal and scope with the client',
        role: 'Client',
        icon: Handshake,
    },
    {
        n: 2,
        title: 'Research',
        desc: 'Research & pressure-test feasibility with Claude',
        role: 'Developer',
        logo: '/logo/claude.svg',
    },
    {
        n: 3,
        title: 'Design & plan',
        desc: 'System design, DB schema, UX/UI & task breakdown in Notion',
        role: 'Developer / Architect',
        logo: '/logo/notion.svg',
    },
    {
        n: 4,
        title: 'Build & review',
        desc: 'Ship fast with Claude Code — then I review every PR by hand before it merges to GitHub',
        role: 'Developer (me)',
        logo: '/logo/claude.svg',
        badge: Terminal,
    },
    {
        n: 5,
        title: 'UAT',
        desc: 'User acceptance testing with the client',
        role: 'Client / QA',
        icon: UserCheck,
    },
    {
        n: 6,
        title: 'Production',
        desc: 'Shipped & live in production',
        role: 'Developer / DevOps',
        icon: Rocket,
    },
];

/** One workflow card — shared by the desktop stepper and the mobile timeline. */
const StepCard = ({ step }: { step: Step }) => {
    const Icon = step.icon;
    const Badge = step.badge;

    return (
        <div
            className="workflow-card group relative flex h-full flex-col gap-2.5 rounded-xl border border-white/10 bg-background-light p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-16px_hsl(var(--primary))]"
            style={
                step.highlight
                    ? ({
                          borderColor: 'hsl(var(--primary) / 0.5)',
                          boxShadow: '0 0 0 1px hsl(var(--primary) / 0.35)',
                      } as CSSProperties)
                    : undefined
            }
        >
            <span className="font-anton text-sm leading-none text-muted-foreground">
                {step.n.toString().padStart(2, '0')}
            </span>

            <div className="relative size-9">
                {step.logo ? (
                    <Image
                        src={step.logo}
                        alt=""
                        width={36}
                        height={36}
                        className="size-9 object-contain"
                    />
                ) : Icon ? (
                    <Icon
                        className="size-8 text-primary"
                        strokeWidth={1.6}
                        aria-hidden
                    />
                ) : null}

                {Badge && (
                    <span className="absolute -bottom-1.5 -right-1.5 flex size-4 items-center justify-center rounded bg-background ring-1 ring-white/10">
                        <Badge className="size-2.5 text-primary" aria-hidden />
                    </span>
                )}
            </div>

            <h3 className="font-anton text-base leading-tight">{step.title}</h3>
            <p className="text-xs leading-snug text-muted-foreground">
                {step.desc}
            </p>

            <div className="mt-auto flex flex-col gap-1.5 pt-1">
                <span className="inline-flex w-fit items-center rounded-full border border-white/10 px-2 py-0.5 text-[11px] leading-none text-muted-foreground">
                    {step.role}
                </span>
                {step.highlight && (
                    <span className="text-[11px] font-semibold text-primary">
                        AI ships, I verify.
                    </span>
                )}
            </div>
        </div>
    );
};

const Workflow = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // `immediateRender: false` is the key robustness choice: the
                // cards/lines render at their natural (visible) state and are
                // only hidden the instant the tween actually plays. If the
                // ScrollTrigger ever fails to fire (Lenis/layout timing), the
                // failure mode is "visible" instead of "stuck at opacity 0".
                const st = () =>
                    ({
                        trigger: container.current,
                        start: 'top 85%',
                        once: true,
                    }) as const;

                gsap.from('.workflow-card', {
                    opacity: 0,
                    y: 40,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.08,
                    immediateRender: false,
                    scrollTrigger: st(),
                });

                gsap.fromTo(
                    '.wf-draw-x',
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 0.9,
                        ease: 'power2.out',
                        immediateRender: false,
                        scrollTrigger: st(),
                    },
                );
                gsap.fromTo(
                    '.wf-draw-y',
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 0.9,
                        ease: 'power2.out',
                        immediateRender: false,
                        scrollTrigger: st(),
                    },
                );
                gsap.from('.wf-loop', {
                    opacity: 0,
                    duration: 0.6,
                    immediateRender: false,
                    scrollTrigger: st(),
                });
            });

            // Recalculate trigger positions once fonts/images/layout settle, so
            // the start point isn't stale (a common Lenis + Next.js flake).
            const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
            return () => window.clearTimeout(t);
        },
        { scope: container },
    );

    return (
        <section className="py-section" id="my-workflow">
            <div className="container" ref={container}>
                <SectionTitle title="My Workflow" />

                <p className="mb-12 max-w-[560px] text-muted-foreground">
                    How I take a project from a client request to production. AI
                    accelerates every step — but I own the outcome and verify the
                    work by hand.
                </p>

                {/* ---------- Desktop: single-row stepper ---------- */}
                <div className="relative hidden pb-20 lg:block">
                    {/* row of cards + connector line */}
                    <div className="relative grid grid-cols-6 gap-4">
                        {/* connector (draws L→R, behind cards, shows in the gaps) */}
                        <span
                            className="wf-draw-x pointer-events-none absolute left-[8.3%] right-[8.3%] top-1/2 z-0 h-0.5 -translate-y-1/2 origin-left rounded-full bg-white/20"
                            aria-hidden
                        />
                        {STEPS.map((s) => (
                            <div key={s.n} className="relative z-10">
                                <StepCard step={s} />
                            </div>
                        ))}
                    </div>

                    {/* loop-back: dashed "U" from UAT (step 05) back to step 01 */}
                    <div
                        className="wf-loop pointer-events-none absolute bottom-6 left-[8.3%] right-[25%] h-10 rounded-b-2xl border-b-[3px] border-l-[3px] border-r-[3px] border-dashed border-white/70"
                        aria-hidden
                    />
                    {/* up arrow into step 01 */}
                    <ChevronUp
                        className="wf-loop pointer-events-none absolute bottom-[54px] left-[8.3%] size-5 -translate-x-1/2 text-white/70"
                        aria-hidden
                    />
                    <span className="wf-loop absolute bottom-0 left-[41.65%] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[15px] font-medium text-white">
                        <RotateCcw className="size-4" aria-hidden />
                        New requirements loop back to step 01 — the cycle repeats
                    </span>
                </div>

                {/* ---------- Mobile / tablet: vertical timeline ---------- */}
                <div className="relative lg:hidden">
                    <span
                        className="wf-draw-y absolute bottom-3 left-[7px] top-3 w-0.5 origin-top rounded-full bg-white/15"
                        aria-hidden
                    />
                    <div className="flex flex-col gap-5">
                        {STEPS.map((s) => (
                            <div key={s.n} className="relative pl-9">
                                <span
                                    className="absolute left-0 top-5 size-4 rounded-full border-2 border-background bg-primary"
                                    aria-hidden
                                />
                                <StepCard step={s} />
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 flex items-center gap-2 pl-9 text-[15px] font-medium text-white">
                        <RotateCcw className="size-4 shrink-0" aria-hidden />
                        New requirements loop back to step 01 — the cycle
                        repeats.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
