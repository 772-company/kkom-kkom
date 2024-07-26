import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import LinkButton from "@/components/LinkButton";
import Hamster from "@/components/hamster.jpg";

export default function Home() {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex gap-[10px]">
        <Button
          text="white"
          color="white"
          type="button"
          className="h-[30px] w-[100px]"
        />
        <Button
          text="disabled"
          color="white"
          type="button"
          className="h-[30px] w-[100px]"
          disabled={true}
        />
      </div>
      <div className="flex gap-[10px]">
        <Button
          text="green"
          color="green"
          type="button"
          className="h-[30px] w-[100px]"
        />
        <Button
          text="disabled"
          color="green"
          type="button"
          className="h-[30px] w-[100px]"
          disabled={true}
        />
      </div>
      <Button
        text="red"
        color="red"
        type="button"
        className="h-[30px] w-[100px]"
      />
      <Button
        text="white/gray"
        color="white/gray"
        type="button"
        className="h-[30px] w-[100px]"
      />
      <LinkButton
        text="LinkButton - green"
        link="/merong"
        color="green"
        className="h-[30px] w-[200px]"
      />
      <LinkButton
        text="LinkButton - green/gradient"
        link="/merong"
        color="green/gradient"
        className="h-[30px] w-[300px]"
      />
      <IconButton
        src={Hamster}
        alt="햄스터"
        className="h-[50px] w-[50px] object-cover"
      />
    </div>
  );
}
