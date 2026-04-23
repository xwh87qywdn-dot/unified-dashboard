from pathlib import Path


def main() -> None:
    input_path = Path("input.txt")
    output_path = Path("output.txt")

    if not input_path.exists():
        print("Error: input.txt was not found")
        raise SystemExit(1)

    text = input_path.read_text(encoding="utf-8")
    output_path.write_text(text.upper(), encoding="utf-8")

    print("Success: converted input.txt to uppercase and wrote output.txt")


if __name__ == "__main__":
    main()
