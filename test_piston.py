import requests

res = requests.post('https://emkc.org/api/v2/piston/execute', json={
    "language": "python",
    "version": "*",
    "files": [{"content": "print('hello from piston')"}],
    "stdin": ""
})

print(res.json())
