'use client';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { CSSProperties, useRef } from 'react';
import {
    Handshake,
    Eye,
    UserCheck,
    Rocket,
    Terminal,
    RotateCcw,
    type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Phase = 'Discover' | 'Define' | 'Build' | 'Verify' | 'Ship';

const PHASE_COLOR: Record<Phase, string> = {
    Discover: '#22d3ee', // cyan
    Define: '#8b5cf6', // violet
    Build: '#22c55e', // green
    Verify: '#f59e0b', // amber (my differentiator)
    Ship: '#10b981', // emerald
};

const PHASES: Phase[] = ['Discover', 'Define', 'Build', 'Verify', 'Ship'];

interface Step {
    n: number;
    title: string;
    desc: string;
    role: string;
    phase: Phase;
    logo?: string;
    icon?: LucideIcon;
    badge?: LucideIcon; // small overlay to distinguish same-logo steps
    highlight?: boolean;
}

const STEPS: Step[] = [
    {
        n: 1,
        title: 'Requirement',
        desc: 'Gather requirements from the client',
        role: 'Client',
        phase: 'Discover',
        icon: Handshake,
    },
    {
        n: 2,
        title: 'Research',
        desc: 'Research & feasibility with Claude',
        role: 'Developer',
        phase: 'Discover',
        logo: '/logo/claude.svg',
    },
    {
        n: 3,
        title: 'Knowledge base',
        desc: 'Store findings in Notion',
        role: 'Developer',
        phase: 'Define',
        logo: '/logo/notion.svg',
    },
    {
        n: 4,
        title: 'System design',
        desc: 'Tech stack, DB schema & UX/UI in Notion',
        role: 'Developer / Architect',
        phase: 'Define',
        logo: '/logo/notion.svg',
    },
    {
        n: 5,
        title: 'Plan & tasks',
        desc: 'Break the build into tasks in Notion',
        role: 'Developer / PM',
        phase: 'Define',
        logo: '/logo/notion.svg',
    },
    {
        n: 6,
        title: 'Coding & testing',
        desc: 'Implement & test with Claude Code',
        role: 'Developer',
        phase: 'Build',
        logo: '/logo/claude.svg',
        badge: Terminal,
    },
    {
        n: 7,
        title: 'Commit & push',
        desc: 'Version control on GitHub',
        role: 'Developer',
        phase: 'Build',
        logo: '/logo/github.svg',
    },
    {
        n: 8,
        title: 'Review & merge',
        desc: 'I review every PR by hand before merge',
        role: 'Developer (me)',
        phase: 'Verify',
        icon: Eye,
        highlight: true,
    },
    {
        n: 9,
        title: 'UAT',
        desc: 'User acceptance testing with the client',
        role: 'Client / QA',
        phase: 'Verify',
        icon: UserCheck,
    },
    {
        n: 10,
        title: 'Production',
        desc: 'Shipped & live in production',
        role: 'Developer / DevOps',
        phase: 'Ship',
        icon: Rocket,
    },
];

/** One workflow card — shared by the desktop stepper and the mobile timeline. */
const StepCard = ({ step }: { step: Step }) => {
    const color = PHASE_COLOR[step.phase];
    const Icon = step.icon;
    const Badge = step.badge;

    return (
        <div
            className="workflow-card group relative flex h-full flex-col gap-2.5 rounded-xl border bg-background-light p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-16px_var(--phase)]"
            style={
                {
                    '--phase': color,
                    borderColor: step.highlight ? `${color}66` : undefined,
                    boxShadow: step.highlight
                        ? `0 0 0 1px ${color}44`
                        : undefined,
                } as CSSProperties
            }
        >
            {/* header: step number + phase dot */}
            <div className="flex items-center justify-between">
                <span className="font-anton text-sm leading-none text-muted-foreground">
                    {step.n.toString().padStart(2, '0')}
                </span>
                <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden
                />
            </div>

            {/* logo / icon */}
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
                        className="size-8"
                        style={{ color }}
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
                    <span
                        className="text-[11px] font-semibold"
                        style={{ color }}
                    >
                        AI ships, I verify.
                    </span>
                )}
            </div>
        </div>
    );
};

const Workflow = () => {
    const container = useRef<HTMLDivElement>(null);

    // Desktop snake: row 1 left→right (steps 1-5), row 2 right→left (steps 6-10).
    const rowOne = STEPS.slice(0, 5);
    const rowTwo = [...STEPS.slice(5, 10)].reverse(); // renders 10,9,8,7,6

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // cards reveal (matches My Stack / My Experience)
                gsap.from('.workflow-card', {
                    opacity: 0,
                    y: 40,
                    stagger: 0.06,
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 75%',
                        end: 'center 65%',
                        scrub: 0.5,
                    },
                });

                // connector lines draw themselves on scroll
                gsap.fromTo(
                    '.wf-draw-x',
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        ease: 'none',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: container.current,
                            start: 'top 70%',
                            end: 'center 60%',
                            scrub: 0.6,
                        },
                    },
                );
                gsap.fromTo(
                    '.wf-draw-y',
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: container.current,
                            start: 'top 66%',
                            end: 'center 60%',
                            scrub: 0.6,
                        },
                    },
                );
                gsap.from('.wf-loop', {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'center 70%',
                        end: 'center 55%',
                        scrub: 0.6,
                    },
                });
            });
        },
        { scope: container },
    );

    return (
        <section className="py-section" id="my-workflow">
            <div className="container" ref={container}>
                <SectionTitle title="My Workflow" />

                <p className="mb-8 max-w-[560px] text-muted-foreground">
                    How I take a project from a client request to production —
                    AI accelerates every step, but I own the outcome and verify
                    the work by hand.
                </p>

                {/* phase legend */}
                <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
                    {PHASES.map((p) => (
                        <span
                            key={p}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                            <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: PHASE_COLOR[p] }}
                                aria-hidden
                            />
                            {p}
                        </span>
                    ))}
                </div>

                {/* ---------- Desktop: 2-row snake stepper ----------
                   Cards are a fixed 184px tall with a 64px (mt-16) row gap, so
                   the right-hand turn connector and the loop-back bracket use
                   deterministic offsets (row centres at 92px and 92+184+64=340px).
                   The horizontal lines sit at each row's own vertical centre, so
                   they stay aligned even if that height ever changes. */}
                <div className="hidden lg:flex">
                    {/* loop-back gutter: dashed bracket from the last row up to step 01 */}
                    <div className="relative w-14 shrink-0">
                        <div
                            className="wf-loop absolute bottom-[92px] right-1 top-[92px] rounded-l-2xl border-b-2 border-l-2 border-t-2 border-dashed"
                            style={{ borderColor: `${PHASE_COLOR.Verify}88` }}
                            aria-hidden
                        />
                        <span
                            className="wf-loop absolute left-0.5 top-1/2 flex -translate-y-1/2 items-center gap-1 whitespace-nowrap text-[11px] font-medium"
                            style={{
                                color: PHASE_COLOR.Verify,
                                writingMode: 'vertical-rl',
                            }}
                        >
                            <RotateCcw className="size-3" aria-hidden />
                            new requirements
                        </span>
                    </div>

                    {/* timeline */}
                    <div className="relative flex-1">
                        {/* right-hand turn connector (draws top→bottom) */}
                        <span
                            className="wf-draw-y pointer-events-none absolute right-[9%] top-[92px] z-0 h-[248px] w-0.5 origin-top rounded-full bg-white/20"
                            aria-hidden
                        />

                        {/* row 1 */}
                        <div className="relative grid grid-cols-5 gap-4">
                            <span
                                className="wf-draw-x pointer-events-none absolute left-[9%] right-[9%] top-1/2 z-0 h-0.5 -translate-y-1/2 origin-left rounded-full bg-white/20"
                                aria-hidden
                            />
                            {rowOne.map((s) => (
                                <div key={s.n} className="relative z-10 h-[184px]">
                                    <StepCard step={s} />
                                </div>
                            ))}
                        </div>

                        {/* row 2 (reversed for the snake flow) */}
                        <div className="relative mt-16 grid grid-cols-5 gap-4">
                            <span
                                className="wf-draw-x pointer-events-none absolute left-[9%] right-[9%] top-1/2 z-0 h-0.5 -translate-y-1/2 origin-right rounded-full bg-white/20"
                                aria-hidden
                            />
                            {rowTwo.map((s) => (
                                <div key={s.n} className="relative z-10 h-[184px]">
                                    <StepCard step={s} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------- Mobile / tablet: vertical timeline ---------- */}
                <div className="relative lg:hidden">
                    {/* vertical line */}
                    <span
                        className="wf-draw-y absolute bottom-3 left-[7px] top-3 w-0.5 origin-top rounded-full bg-white/15"
                        aria-hidden
                    />
                    <div className="flex flex-col gap-5">
                        {STEPS.map((s) => (
                            <div key={s.n} className="relative pl-9">
                                <span
                                    className="absolute left-0 top-5 size-4 rounded-full border-2 border-background"
                                    style={{
                                        backgroundColor: PHASE_COLOR[s.phase],
                                    }}
                                    aria-hidden
                                />
                                <StepCard step={s} />
                            </div>
                        ))}
                    </div>
                    <p
                        className="mt-5 flex items-center gap-2 pl-9 text-[13px]"
                        style={{ color: PHASE_COLOR.Verify }}
                    >
                        <RotateCcw className="size-3.5 shrink-0" aria-hidden />
                        New requirements loop back to step 01 — the cycle
                        repeats.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
