def extract_text(content):

    if isinstance(content, str):
        return content

    if isinstance(content, list):

        final_text = ""

        for item in content:

            if isinstance(item, dict):

                if item.get("type") == "text":
                    final_text += item.get("text", "")

        return final_text

    return str(content)

