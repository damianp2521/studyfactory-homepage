"use client";

import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function FullPageScroll({ children }: Props) {
    const childArray = React.Children.toArray(children);

    return (
        <div className="relative w-full">
            {childArray.map((child, index) => (
                <div key={index} className="relative w-full">
                    {React.isValidElement<{ isActive?: boolean }>(child)
                        ? React.cloneElement(child, { isActive: true })
                        : child}
                </div>
            ))}
        </div>
    );
}
