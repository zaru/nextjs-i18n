import { getDictionary } from "../dictionaries";

interface Props {
  params: {
    lang: "en" | "ja";
  };
}

export async function generateStaticParams() {
  return ["en", "ja"].map((lang) => ({ lang }));
}

export default async function Page(props: Props) {
  const dict = await getDictionary(props.params.lang);
  return (
    <div>
      {props.params.lang} / {dict.products.cart}
    </div>
  );
}
