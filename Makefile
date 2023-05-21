# ============================================================================ #
#                                                                              #
#                                                               /   /   \      #
#   Made By IsCoffeeTho (Aaron Menadue)                       /    |      \    #
#                                                            |     |       |   #
#   Makefile                                                 |      \      |   #
#                                                            |       |     |   #
#   Last Edited: 12:05AM 21/05/2023                           \      |    /    #
#                                                               \   /   /      #
#                                                                              #
# ============================================================================ #


all:
	vsce package

clean:
	rm -rf out

fclean: clean
	rm -rf *.vsix

re: fclean all

.PHONY: all re fclean clean