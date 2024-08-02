import { useOverlay } from "@/hooks/use-overlay";

export default function Home() {
  return (
    <div className="w-full py-5">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-3xl">랜딩페이지</h1>
        <p className="text-xl text-brand-primary">color</p>
        <p className="text-xl text-brand-secondary">color</p>
        <p className="text-xl text-brand-tertiary">color</p>
        <br />
        <p className="text-xl text-point-purple">color</p>
        <p className="text-xl text-point-blue">color</p>
        <p className="text-xl text-point-cyan">color</p>
        <p className="text-xl text-point-pink">color</p>
        <p className="text-xl text-point-rose">color</p>
        <p className="text-xl text-point-orange">color</p>
        <p className="text-xl text-point-yellow">color</p>
        <br />
        <p className="size-28 bg-gradient">background</p>
        <p className="size-28 bg-background-primary">background</p>
        <p className="size-28 bg-background-secondary">background</p>
        <p className="size-28 bg-background-tertiary">background</p>
        <p className="size-28 bg-background-inverse text-black">background</p>
        <br />
        <p className="text-xl text-interaction-inactive">color</p>
        <p className="text-xl text-interaction-hover">color</p>
        <p className="text-xl text-interaction-pressed">color</p>
        <p className="text-xl text-interaction-focus">color</p>
        <br />
        <p className="border-8 border-border-primary text-xl">border</p>
        <br />
        <p className="text-xl text-text-primary">color</p>
        <p className="text-xl text-text-secondary">color</p>
        <p className="text-xl text-text-tertiary">color</p>
        <p className="text-xl text-text-default">color</p>
        <p className="text-xl text-text-inverse">color</p>
        <p className="text-xl text-text-disabled">color</p>
        <br />
        <p className="text-xl text-status-danger">color</p>
        <br />
        <p className="text-xl text-icon-primary">color</p>
        <p className="text-xl text-icon-inverse">color</p>
        <p className="text-xl text-icon-brand">color</p>
      </div>
    </div>
  );
}
