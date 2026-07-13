'use client';
import { IProject } from '@/types';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    project: IProject | null;
    onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: Props) => {
    const [index, setIndex] = useState(0);
    const images = project?.images ?? [];

    useEffect(() => setIndex(0), [project]);

    const prev = useCallback(
        () => setIndex((i) => (i - 1 + images.length) % images.length),
        [images.length],
    );
    const next = useCallback(
        () => setIndex((i) => (i + 1) % images.length),
        [images.length],
    );

    useEffect(() => {
        if (!project) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [project, onClose, prev, next]);

    if (!project) return null;

    return (
        <div
            className="lightbox fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={onClose}
        >
            {/* header */}
            <div
                className="w-full max-w-[1100px] flex items-end justify-between gap-4 mb-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <h3 className="font-anton text-2xl sm:text-3xl leading-none">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2">
                        {project.techStack.slice(0, 4).join(' · ')}
                    </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:text-primary transition-colors"
                            aria-label="Open live site"
                        >
                            <ExternalLink size={24} />
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="hover:text-primary transition-colors"
                    >
                        <X size={28} />
                    </button>
                </div>
            </div>

            {/* image */}
            <div
                className="relative w-full max-w-[1100px] aspect-[16/10] bg-background-light overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    key={images[index]}
                    src={images[index]}
                    alt={project.title}
                    fill
                    sizes="1100px"
                    className="object-contain"
                    priority
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 size-11 flex items-center justify-center bg-black/50 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 size-11 flex items-center justify-center bg-black/50 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            <ChevronRight />
                        </button>
                    </>
                )}
            </div>

            {/* dots */}
            {images.length > 1 && (
                <div
                    className="mt-3 flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                                i === index ? 'w-6 bg-primary' : 'w-1.5 bg-white/30'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectLightbox;
