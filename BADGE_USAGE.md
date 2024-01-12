<div align="center">

  ![IndoGitHubers-badge](https://github.com/depapp/IndoGitHubers/assets/6134774/24e1a13a-afe4-4ecb-81b3-cfb4344afd2e)

</div>

# :grey_question: how to use IndoGitHubers-badge
you only need to add your GitHub username to the `username` query params (replace the `yourUsername` with yours)
```
https://indogithubers-badge.vercel.app/badge?username=yourUsername
```
for example
```
https://indogithubers-badge.vercel.app/badge?username=depapp
```
it will generate this kind of badge

![default](https://github.com/depapp/IndoGitHubers/assets/6134774/00f58088-2bfe-4236-88b8-fbf94eb96d19)

# :gear: customize your badge
you can modify the badge style using `style` query params and modify the badge color using `color` query params.

`style` values that you can use are `social`, `plastic`, `flat`, `flat-square`, `for-the-badge`.

`color` values that you can use, such as `red`, `yellow`, `00FF00`, `D3EB30`, etc

- for example: `https://indogithubers-badge.vercel.app/badge?username=depapp&style=plastic&color=blue` it will generate this kind of badge

![plastic-blue](https://github.com/depapp/IndoGitHubers/assets/6134774/2b231a24-87dc-4e82-b3c9-72f24ab517ab)

- for example: `https://indogithubers-badge.vercel.app/badge?username=depapp&style=flat-square&color=D3EB30` it will generate this kind of badge

![flat-square_D3EB30](https://github.com/depapp/IndoGitHubers/assets/6134774/760387ea-a446-4c78-b45a-2a394ac0f008)


# :grey_question: how to embed IndoGitHubers Rank
- using `markdown`
```markdown
![IndoGitHubers-badge](https://indogithubers-badge.vercel.app/badge?username=depapp)
```

- using `image` html tag
```html
  <img src="https://indogithubers-badge.vercel.app/badge?username=depapp" alt="IndoGitHubers Badge">
```

- using `image` and `link` html tag
```html
  <a href="https://indogithubers.vercel.app/">
    <img src="https://indogithubers-badge.vercel.app/badge?username=depapp" alt="IndoGitHubers Badge">
  </a>
```
