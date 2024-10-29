import { FileInput, FileInputProps, Pill } from "@mantine/core";

const ValueComponent: FileInputProps["valueComponent"] = ({
  value,
}: {
  value: any;
}) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

export default function CustomFileInput() {
  return (
    <FileInput
      label="Gambar"
      placeholder="Upload gambar"
      multiple
      valueComponent={ValueComponent}
    />
  );
}
