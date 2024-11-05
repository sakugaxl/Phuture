import os

def generate_tree(startpath, level=-1):
    """Generate the directory tree structure for a given path, ignoring node_modules."""
    for root, dirs, files in os.walk(startpath):
        # Ignore node_modules directory
        dirs[:] = [d for d in dirs if d != 'node_modules']
        
        level_diff = root.replace(startpath, "").count(os.sep)
        indent = ' ' * 4 * (level_diff)
        if level == -1 or level_diff < level:
            print(f"{indent}├── {os.path.basename(root)}/")
            subindent = ' ' * 4 * (level_diff + 1)
            for f in files:
                print(f"{subindent}├── {f}")

if __name__ == "__main__":
    # Prompt user for a directory path
    path_to_scan = input("Enter the directory path to scan: ").strip()

    # Check if the path is valid
    if not os.path.isdir(path_to_scan):
        print(f"Error: {path_to_scan} is not a valid directory.")
    else:
        print(f"Directory tree for {os.path.abspath(path_to_scan)}:")
        generate_tree(path_to_scan)
