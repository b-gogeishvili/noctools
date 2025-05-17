from commands import * 

import subprocess
import time
import os


def run_commands(result_n, result_w):
    if int(result_n.stdout.strip('"')) < 20 or int(result_w.stdout.strip('"')) < 20:
        print("Running Commands...")
        run_n = subprocess.run(scale_north, stdout=subprocess.PIPE, text=True)
        run_w = subprocess.run(scale_west, stdout=subprocess.PIPE, text=True)

        if run_n.stderr or run_w.stderr:
            print(f"North err: {run_n.stderr}")
            print(f"West err: {run_w.stderr}")
    
        print("Success!\n")

        return True
    else:
        return False

def scale():
    num_of_restarts = 0
    while True:
        os.system("clear")

        result_n = subprocess.run(get_north, stdout=subprocess.PIPE, text=True)
        print(f"Number of replicas on North: {result_n.stdout}")

        result_w = subprocess.run(get_west, stdout=subprocess.PIPE, text=True)
        print(f"Number of replicas on West: {result_w.stdout}\n")
      
        print(
                "Parsed " + 
                result_n.stdout.strip('"') +
                " " +
                result_w.stdout.strip('"') +
                "\n"
        )
        
        command_ran = run_commands(result_n, result_w)
        if command_ran:
            num_of_restarts += 1
            result_n = subprocess.run(get_north, stdout=subprocess.PIPE, text=True)
            print(f"Number of replicas after commands on North: {result_n.stdout}")

            result_w = subprocess.run(get_west, stdout=subprocess.PIPE, text=True)
            print(f"Number of replicas after commands on West: {result_n.stdout}\n")
        else:
            print("Skipped Commands\n")

        print("Sleeping...")
        print(f"------------ number of restarts: {num_of_restarts} ---------------------\n")

        time.sleep(30)

scale()
