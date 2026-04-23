from pathlib import Path


def main() -> None:
    input_path = Path("input.txt")
    output_path = Path("output.txt")

    try:
        with input_path.open("r", encoding="utf-8") as input_file, output_path.open(
            "w", encoding="utf-8"
        ) as output_file:
            for line in input_file:
                output_file.write(line.upper())
    except FileNotFoundError:
        print("Error: input.txt was not found")
        raise SystemExit(1)
    except PermissionError:
        print("Error: insufficient file permissions for input.txt or output.txt")
        raise SystemExit(1)
    except OSError as error:
        print(f"Error: file operation failed ({error})")
        raise SystemExit(1)

    print("Success: converted input.txt to uppercase and wrote output.txt")


if __name__ == "__main__":
    main()
