"use client";

import EventCard from "./EventCard";

export default function EventGrid({ events, title }) {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {title && (
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
}
