type CustomToastProps = {
  trigger: boolean;
  title: string;
  message: string;
};

export default function CustomToast(props: CustomToastProps) {
  const { trigger, title, message } = props;
  return (
    <div className="absolute border border-white p-2 z-50 bottom-[10%] left-[80%]">
      <>CustomToast</>
      <div>{title}</div>
      <div>{message}</div>
    </div>
  );
}
