import os
import shutil


def move_file_to_cwd(file_name):
    # Define the source and destination paths
    downloads_folder = os.path.expanduser('~/Downloads')
    source_path = os.path.join(downloads_folder, file_name)
    destination_path = os.path.join(os.getcwd(), file_name)

    try:
        # Move the file from Downloads to the current directory
        shutil.move(source_path, destination_path)
        print(f'Successfully moved {file_name} to {destination_path}')
    except FileNotFoundError:
        print(f'The file {file_name} does not exist in {downloads_folder}')
    except Exception as e:
        print(f'Error occurred: {e}')