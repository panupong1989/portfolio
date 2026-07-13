'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />

            {/* Profile photo — top right, next to the title */}
            <div className="slide-up-and-fade max-md:hidden absolute top-[14%] right-[5%] z-[1] w-[190px] xl:w-[230px] aspect-square rounded-full overflow-hidden ring-1 ring-white/10">
                <Image
                    src="/assets/profile.jpg"
                    alt="Panupong (Beer)"
                    fill
                    sizes="230px"
                    className="object-cover"
                    priority
                />
            </div>

            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <span className="text-primary">FULL-STACK</span>
                        <br /> <span className="ml-4">DEVELOPER</span>
                    </h1>
                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Panupong (Beer)
                        </span>
                        . A full-stack developer who builds IoT platforms,
                        databases, and management systems end to end — directing
                        AI across the whole stack and reviewing everything it
                        ships.
                    </p>
                    <Button
                        as="link"
                        href={`mailto:${GENERAL_INFO.email}?subject=${GENERAL_INFO.emailSubject}`}
                        variant="primary"
                        className="mt-9 banner-button slide-up-and-fade"
                    >
                        Let&apos;s Talk
                    </Button>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="size-3 rounded-full bg-white"></span>
                        <span className="text-sm text-muted-foreground">
                            Available for full-time opportunities
                        </span>
                    </div>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            9+
                        </h5>
                        <p className="text-muted-foreground">
                            Projects Shipped
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            10+
                        </h5>
                        <p className="text-muted-foreground">
                            Years in Engineering
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            IoT
                        </h5>
                        <p className="text-muted-foreground">Device to Cloud</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
