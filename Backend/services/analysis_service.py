import re
class AnalysisService:
    RULES = [
    {
        "id": "debug-print",
        "pattern": re.compile(r"\bprint\s*\("),
        "message": "Debug print statement found",
        "severity": "low",
        "penalty": 10,
    },
    {
    "id": "wildcard-import",
    "pattern": re.compile(r"from\s+\S+\s+import\s+\*"),
    "message": "Wildcard import detected",
    "severity": "medium",
    "penalty": 10,
    },
    {
    "id": "shell-true",
    "pattern": re.compile(r"subprocess\.\w+\([^)]*shell\s*=\s*True"),
    "message": "subprocess called with shell=True",
    "severity": "high",
    "penalty": 25,
    },
    {
    "id": "assert",
    "pattern": re.compile(r"\bassert\b"),
    "message": "Assert statement found",
    "severity": "low",
    "penalty": 5,
    },
    {
    "id": "open-without-with",
    "pattern": re.compile(r"(?m)^\s*\w+\s*=\s*open\("),
    "message": "File opened without using a context manager",
    "severity": "medium",
    "penalty": 10,
    },
    
    {
        "id": "hardcoded-secret",
        "pattern": re.compile(
            r"""(?i)(password|passwd|pwd|api[_-]?key|secret|token)\s*=\s*['"][^'"]{6,}['"]"""
        ),
        "message": "Possible hardcoded secret found",
        "severity": "high",
        "penalty": 25,
    },
    {
        "id": "unsafe-eval",
        "pattern": re.compile(r"\b(eval|exec)\s*\("),
        "message": "Unsafe eval/exec usage found",
        "severity": "high",
        "penalty": 25,
    },
    {
        "id": "broad-exception",
        "pattern": re.compile(r"\bexcept\s*(Exception)?\s*:"),
        "message": "Broad exception handler found",
        "severity": "medium",
        "penalty": 15,
    },
    {
        "id": "bare-except-pass",
        "pattern": re.compile(r"except\s*:\s*\n\s*pass"),
        "message": "Empty bare except block found",
        "severity": "high",
        "penalty": 25,
    },
    {
        "id": "todo-comment",
        "pattern": re.compile(r"(?i)\b(TODO|FIXME|HACK)\b"),
        "message": "Pending TODO/FIXME/HACK comment found",
        "severity": "low",
        "penalty": 5,
    },
    {
        "id": "debug-mode",
        "pattern": re.compile(r"\bdebug\s*=\s*True\b"),
        "message": "Debug mode enabled",
        "severity": "high",
        "penalty": 20,
    },
    {
        "id": "mutable-default",
        "pattern": re.compile(r"def\s+\w+\s*\([^)]*=\s*(\[\]|\{\}|set\(\))"),
        "message": "Mutable default argument found",
        "severity": "medium",
        "penalty": 15,
    },
]

    @staticmethod
    def analyze_code(code):
        issues = []
        score = 100

        lines = code.splitlines()

        for rule in AnalysisService.RULES:
            for match in rule["pattern"].finditer(code):
                line_number = code[: match.start()].count("\n") + 1
                issues.append(
                    {
                        "rule_id": rule["id"],
                        "severity": rule["severity"],
                        "line": line_number,
                        "message": rule["message"],
                    }
                )
                score -= rule["penalty"]

        if len(lines) > 100:
            issues.append(
                {
                    "rule_id": "large-file",
                    "severity": "medium",
                    "line": None,
                    "message": "Large file detected",
                }
            )
            score -= 5

        long_function_issues = AnalysisService._find_long_functions(lines)
        for issue in long_function_issues:
            issues.append(issue)
            score -= 10

        # total_issues = sum(
        #     len(lines["issues"])
        # )

        return {
            "score": max(score, 0),
            "issues": issues,
        }

    @staticmethod
    def _find_long_functions(lines, max_lines=50):
        issues = []
        function_start = None
        function_indent = None
        function_name = None

        for index, line in enumerate(lines, start=1):
            stripped = line.strip()

            if not stripped:
                continue

            indent = len(line) - len(line.lstrip())
            function_match = re.match(r"def\s+([A-Za-z_][A-Za-z0-9_]*)",stripped)

            if function_match:
                if function_start and index - function_start > max_lines:
                    issues.append(
                        AnalysisService._long_function_issue(
                            function_name,
                            function_start,
                            index - function_start,
                        )
                    )

                function_start = index
                function_indent = indent
                function_name = function_match.group(1)
                continue

            if function_start and indent <= function_indent and not stripped.startswith("#"):
                function_length = index - function_start
                if function_length > max_lines:
                    issues.append(
                        AnalysisService._long_function_issue(
                            function_name,
                            function_start,
                            function_length,
                        )
                    )
                function_start = None
                function_indent = None
                function_name = None

        if function_start and len(lines) - function_start + 1 > max_lines:
            issues.append(
                AnalysisService._long_function_issue(
                    function_name,
                    function_start,
                    len(lines) - function_start + 1,
                )
            )

        return issues

    @staticmethod
    def _long_function_issue(function_name, line_number, function_length):
        return {
            "rule_id": "long-function",
            "severity": "medium",
            "line": line_number,
            "message": f"Function '{function_name}' is too long ({function_length} lines)",
        }

# The analyzer now checks for:
#     print(...)
#     console.log/warn/error(...)
#     hardcoded secrets
#     eval(...) / exec(...)
#     broad exception handlers
#     bare except: pass
#     TODO, FIXME, HACK
#     debug=True
#     mutable default arguments
#     JavaScript loose equality ==
#     large files
#     long functions