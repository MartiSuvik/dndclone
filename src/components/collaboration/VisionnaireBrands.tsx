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
      {
        id: 5,
        image: "https://www.gammarr.com/Projects/Residential/Casablanca%20Villa%20Marocco/3795/image-thumb__3795__main-project/Projects_Residential_Casablanca%20Villa_Hero.c8765011.jpg",
        defaultPos: { x: 1, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "GAMMA",
        website: "https://www.gammarr.com/en",
        description: "Research and innovation, without ever forgetting the values of tradition. A clear vision of the present and an eye on the future. This is how Gamma realises its love of design, strong personality and the intrinsic elegance of each individual element every day.",
      },
      {
        id: 6,
        image: "https://www.arketipo.com/wp-content/uploads/2023/05/INDOOR3.jpg",
        defaultPos: { x: 1, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "ARKETIPO",
        website: "https://www.arketipo.com/en/",
        description: "At Arketipo Firenze, we believe that it is the details that make the difference. Our mood boards highlight those small details that transform a simple room into an extraordinary space.",
      },
      {
        id: 7,
        image: "https://download.cattelanitalia.com/WP/2025/02/Craig_Design_Sofa_Cattelan_Italia_2025_Desktop.jpg?t=1739263281",
        defaultPos: { x: 1, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "CATTELAN ITALIA",
        website: "https://www.cattelanitalia.com/",
        description: "For Cattelan Italia, maturity has arrived and with it the freedom to dare to create ever more imaginative shapes and experiment with processes that make it possible to be recognisable, as well as to create trends. Always keeping the focus on functionality and comfort.",
      },
      {
        id: 8,
        image: "https://img.vittoriafrigerio.it/home/20250407-4184-C.jpg",
        defaultPos: { x: 1, y: 1 },
        corner: "/assets/frame-corner.png",
        edgeHorizontal: "/assets/frame-edge-horizontal.png",
        edgeVertical: "/assets/frame-edge-vertical.png",
        mediaSize: 1,
        borderThickness: 5,
        borderSize: 90,
        isHovered: false,
        name: "VITTORIA FRIGERIO",
        website: "https://www.vittoriafrigerio.it/en/home",
        description: "Fashion and design, refined interaction and stylish interpretation, outstanding quality and poetic vision; all are brought together in Vittoria Frigerio’s new tailoring furnishings, all Made in Italy.",
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