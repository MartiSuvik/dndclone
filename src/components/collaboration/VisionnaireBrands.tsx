"use client"

import { DynamicFrameLayout } from "../ui/dynamic-frame-layout"

export default function DemoPage() {
    const frames = [
      {
        id: 1,
        image: "https://catalogue.visionnaire-home.com/sites/default/files/styles/max_2600x2600/public/space/images-gallery/Visionnaire_BabylonRackCircle_room_000.jpg?itok=Y8G4lpYe&_gl=1*fbdid5*_up*MQ..*_ga*NjkyMzc3MjEyLjE3NDM1MzEzMjU.*_ga_4D36DB6FV2*MTc0MzUzMTMyNS4xLjEuMTc0MzUzMTUzOS4wLjAuMA..",
        defaultPos: { x: 0, y: 0 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "VISIONNAIRE",
        website: "https://www.visionnaire-home.com",
        description: "Visionnaire is a luxury Italian brand known for bespoke, art-driven interior design that blends craftsmanship with innovation. Each creation is tailored to reflect the unique vision and desires of its clientele.",
      },
      {
        id: 2,
        image: "https://www.prestigemobili.com/en/wp-content/uploads/sites/2/2021/11/boiserie-essenza-legno-GRANDUCACOLLECTION-prestigemobili-32.jpg",
        defaultPos: { x: 1, y: 0 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "PRESTIGE",
        website: "https://www.prestigemobili.com/en/",
        description: "Founded in 1989, Prestige crafts high-end, custom-made furniture that unites classic elegance with modern design. Their collections are built to seamlessly elevate every room in the home.",
      },
      {
        id: 3,
        image: "https://www.longhi.it/ContentsFiles/ARNOLD-HOME.jpg",
        defaultPos: { x: 0, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "LONGHI",
        website: "https://www.longhi.it/en-us",
        description: "Longhi offers contemporary Italian furniture and architectural elements defined by comfort, quality, and refined aesthetics. Every piece is a testament to artisanal expertise and timeless design.",
      },
      {
        id: 4,
        image: "https://astercucineusa.com/wp-content/uploads/2020/12/Atelier_2020_17.jpg",
        defaultPos: { x: 1, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "ASTER",
        website: "https://www.astercucine.it/en/",
        description: "Aster Cucine combines Italian craftsmanship with modern kitchen innovation to create emotionally rich, functional living spaces. Their collections cater to diverse lifestyles and design preferences.",
      },
    ]

    return (
        <div className="h-screen w-screen bg-zinc-900">
          <DynamicFrameLayout
            frames={frames}
            className="w-full h-full"
            showFrames={true}   // toggle to show/hide the decorative frame
            hoverSize={2}       // how big the hovered row/column gets
            gapSize={4}
          />
        </div>
      )
}