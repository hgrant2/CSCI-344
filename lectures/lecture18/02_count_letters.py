# Challenge: 
#   1. How many unique letters are in the word supercalifragilisticexpialidocious?
#   2. How many times does each letter occur?

# Your job: loop through each letter of the word.


word = 'supercalifragilisticexpialidocious'
uniqueLetters = []
#print(len(uniqueLetters))
for letter in word:
    if( letter not in uniqueLetters):
        uniqueLetters.append(letter)

print("There are " + str(len(uniqueLetters)) + " letters in " + word)

